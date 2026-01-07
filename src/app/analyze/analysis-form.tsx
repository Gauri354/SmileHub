import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Lightbulb, Stethoscope, User, AlertTriangle, Loader2, Smile, Camera } from 'lucide-react';
import { getAiAnalysis } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

type AnalysisResult = {
  analysis: string;
  suggestion: string;
  recommendedDoctor: string;
  afterPhotoDataUri: string;
  disclaimer: string;
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  exit: { opacity: 0, scale: 0.9 }
};

function toDataURL(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function AnalysisForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { toast } = useToast();
  const placeholderImage = PlaceHolderImages.find((img) => img.id === 'dental-analysis-placeholder');

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setIsCameraOpen(true);
      // Small timeout to ensure video element is mounted
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
      streamRef.current = stream;
    } catch (err) {
      console.error("Camera Error:", err);
      setError("Could not access camera. Please check permissions or use file upload.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(-1, 1); // Mirror the capture to match the preview
        ctx.drawImage(videoRef.current, -canvas.width, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setFile(capturedFile);
            setPreview(URL.createObjectURL(blob));
            setResult(null);
            setError(null);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File Too Large',
          description: 'Please select an image smaller than 5MB.',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to analyze.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    const dataUrl = await toDataURL(file);
    formData.append('image', dataUrl);

    try {
      const analysisResult = await getAiAnalysis(formData);
      if (analysisResult.error) {
        throw new Error(analysisResult.error);
      }
      setResult(analysisResult.data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      toast({
        title: 'Analysis Failed',
        description: err.message || 'Please try again with a clearer photo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-4xl mx-auto shadow-2xl bg-card/80 backdrop-blur-xl border-border/20">
        <CardContent className="p-4 sm:p-8">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                variants={popIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {isCameraOpen ? (
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-6">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover transform -scale-x-100" // Mirror the preview
                      autoPlay
                      playsInline
                      muted
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <Button variant="secondary" onClick={stopCamera}>Cancel</Button>
                      <Button onClick={capturePhoto} className="bg-red-500 hover:bg-red-600 text-white">
                        <Camera className="mr-2 h-4 w-4" /> Capture
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    onClick={() => !preview && fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png, image/jpeg"
                    />
                    {preview ? (
                      <div className="relative group">
                        <Image src={preview} alt="Selected preview" width={400} height={300} className="rounded-lg mx-auto max-h-80 w-auto shadow-lg" />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        {placeholderImage && <Image src={placeholderImage.imageUrl} alt="Upload placeholder" width={200} height={150} className="opacity-20 mb-4" data-ai-hint={placeholderImage.imageHint} />}
                        <Upload className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Click to upload or drag & drop a photo</h3>
                        <p className="text-muted-foreground text-sm mb-6">PNG or JPG (max. 5MB). For best results, use a clear, well-lit photo.</p>

                        <div className="flex items-center gap-2 w-full justify-center border-t pt-6 mt-2">
                          <Button type="button" variant="outline" onClick={(e) => { e.stopPropagation(); startCamera(); }}>
                            <Camera className="mr-2 h-4 w-4" /> Use Camera
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {error && <p className="text-destructive text-sm mt-2 text-center">{error}</p>}
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleSubmit} disabled={!file || isLoading} size="lg" className="transform hover:scale-105 transition-transform">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Smile className="mr-2 h-4 w-4" />
                        Analyze My Smile
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                variants={popIn}
                initial="hidden"
                animate="visible"
              >
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-center mb-6">Your AI Analysis Results</h2>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <Card className="bg-background/50">
                    <CardHeader>
                      <CardTitle className="text-center text-lg">Before</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image src={preview!} alt="Before treatment" width={400} height={300} className="rounded-lg mx-auto shadow-lg" />
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50 border-primary">
                    <CardHeader>
                      <CardTitle className="text-center text-lg text-primary">After (AI Visualization)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image src={result.afterPhotoDataUri} alt="After treatment visualization" width={400} height={300} className="rounded-lg mx-auto shadow-lg" />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-background/50">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                      <Lightbulb className="w-8 h-8 text-primary" />
                      <CardTitle>AI Findings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-bold text-lg">{result.analysis}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                      <Stethoscope className="w-8 h-8 text-primary" />
                      <CardTitle>Suggested Next Step</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-bold text-lg">{result.suggestion}</p>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-2 bg-background/50">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                      <User className="w-8 h-8 text-primary" />
                      <CardTitle>Recommended Specialist</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="font-headline font-bold text-lg">{result.recommendedDoctor}</p>
                        <p className="text-muted-foreground mt-1">Our expert in this area.</p>
                      </div>
                      <Button asChild className="transform hover:scale-105 transition-transform">
                        <Link href="/book-appointment">Book an Appointment</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-destructive/10 border-destructive/30">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                    <CardTitle className="text-destructive">Important Disclaimer</CardTitle>
                  </CardHeader>
                  <CardContent className="text-destructive/90 text-sm">
                    {result.disclaimer}
                  </CardContent>
                </Card>

                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => { setResult(null); handleRemoveImage(); }}>
                    Analyze Another Photo
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
