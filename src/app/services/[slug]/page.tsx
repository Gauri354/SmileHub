'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, DollarSign, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }
  // Image logic
  let imageId = 'service-general';
  if (service.slug === 'teeth-whitening') imageId = 'service-whitening'; // Fallback
  else if (service.slug === 'dental-implants') imageId = 'service-implants';
  else if (service.slug === 'orthodontics') imageId = 'service-orthodontics';
  else if (service.slug === 'general-dentistry') imageId = 'service-general';
  else if (service.slug === 'pediatric-dentistry') imageId = 'service-pediatric';
  else if (service.slug === 'root-canal-therapy') imageId = 'service-root-canal';

  const defaultServiceImage = PlaceHolderImages.placeholderImages.find((img) => img.id === imageId);

  // Specific logic for Interactive Before/After (All Services)
  const isWhitening = service.slug === 'teeth-whitening';
  const isImplants = service.slug === 'dental-implants';
  const isOrtho = service.slug === 'orthodontics';
  const isGeneral = service.slug === 'general-dentistry';
  const isPediatric = service.slug === 'pediatric-dentistry';
  const isRootCanal = service.slug === 'root-canal-therapy';

  const showToggle = true; // Enable for all services

  let beforeImgId = '';
  let afterImgId = '';

  if (isWhitening) {
    beforeImgId = 'whitening-before';
    afterImgId = 'whitening-after';
  } else if (isImplants) {
    beforeImgId = 'implants-before';
    afterImgId = 'implants-after';
  } else if (isOrtho) {
    beforeImgId = 'ortho-before';
    afterImgId = 'ortho-after';
  } else if (isGeneral) {
    beforeImgId = 'general-before';
    afterImgId = 'general-after';
  } else if (isPediatric) {
    beforeImgId = 'pediatric-before';
    afterImgId = 'pediatric-after';
  } else if (isRootCanal) {
    beforeImgId = 'root-canal-before';
    afterImgId = 'root-canal-after';
  }

  const beforeImage = PlaceHolderImages.placeholderImages.find(img => img.id === beforeImgId) || defaultServiceImage;
  const afterImage = PlaceHolderImages.placeholderImages.find(img => img.id === afterImgId) || defaultServiceImage;

  const [showAfter, setShowAfter] = useState(false);
  const currentImage = showToggle ? (showAfter ? afterImage : beforeImage) : defaultServiceImage;

  // Check if we are using a single collage image (same URL for both)
  const isCollage = currentImage?.imageUrl && beforeImage?.imageUrl === afterImage?.imageUrl;

  const toggleImage = () => setShowAfter(!showAfter);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Left Column: Image Area */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-black/5 group">
            {currentImage && (
              <motion.div
                key={showAfter ? 'after' : 'before'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <Image
                  src={currentImage.imageUrl}
                  alt={service.title}
                  fill
                  // Logic: If collage, split top/bottom. If separate images, use standard cover.
                  className={`object-cover ${showToggle && isCollage ? (showAfter ? 'object-bottom' : 'object-top') : ''}`}
                  priority
                />
              </motion.div>
            )}

            {/* Controls for Interactive Services */}
            {showToggle && (
              <>
                {/* Label Badge */}
                <div className="absolute top-4 left-4 z-10 w-full flex justify-between pr-8">
                  <span className={`${showAfter ? 'bg-primary text-white' : 'bg-white/90 text-black'} px-4 py-1.5 rounded-full font-bold text-sm shadow-md backdrop-blur-sm transition-colors`}>
                    {showAfter ? 'AFTER RESULT' : 'BEFORE TREATMENT'}
                  </span>
                </div>

                {/* Arrow Buttons */}
                <button
                  onClick={toggleImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 z-20 border border-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={toggleImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 z-20 border border-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  <button onClick={() => setShowAfter(false)} className={`h-2 rounded-full transition-all duration-300 ${!showAfter ? 'bg-white w-8' : 'bg-white/40 w-2'}`} />
                  <button onClick={() => setShowAfter(true)} className={`h-2 rounded-full transition-all duration-300 ${showAfter ? 'bg-white w-8' : 'bg-white/40 w-2'}`} />
                </div>
              </>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-primary">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.details.explanation}
            </p>

            <div className="bg-card border border-border/50 rounded-2xl p-6 mb-8 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" /> Key Benefits
              </h3>
              <ul className="space-y-3">
                {service.details.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Duration</p>
                  <p className="font-bold">{service.details.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Cost</p>
                  <p className="font-bold">{service.details.cost}</p>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full md:w-auto text-lg py-6 rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              <Link href="/book-appointment">
                Book Appointment <Calendar className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
