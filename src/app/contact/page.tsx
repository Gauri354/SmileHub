'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

const contactDetails = [
  { icon: <MapPin className="h-6 w-6 text-primary" />, title: 'Address', value: '123 Dental Ave, Smile City, 12345' },
  { icon: <Phone className="h-6 w-6 text-primary" />, title: 'Phone', value: '(123) 456-7890' },
  { icon: <Mail className="h-6 w-6 text-primary" />, title: 'Email', value: 'contact@smilehub.com' },
];

const openingHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];


export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const mapImage = PlaceHolderImages.find((img) => img.id === 'contact-map');
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });
  
  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. We will get back to you shortly.',
    });
    form.reset({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We're here to help with any questions you may have. Reach out to us and we'll respond as soon as we can.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="shadow-xl h-full bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl><Input placeholder="e.g., Appointment Inquiry" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="Your message here..." {...field} rows={5} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
              <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {contactDetails.map(detail => (
                  <div key={detail.title} className="flex items-start gap-4">
                    {detail.icon}
                    <div>
                      <h3 className="font-semibold">{detail.title}</h3>
                      <p className="text-muted-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
             <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5"/>Clinic Hours</CardTitle></CardHeader>
              <CardContent>
                 <ul className="space-y-2 text-muted-foreground">
                  {openingHours.map(item => (
                    <li key={item.day} className="flex justify-between">
                      <span>{item.day}</span>
                      <span className="font-medium text-foreground">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {mapImage && (
              <Card className="shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm">
                <Image src={mapImage.imageUrl} alt={mapImage.description} width={1200} height={400} className="w-full h-64 object-cover" data-ai-hint={mapImage.imageHint} />
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
