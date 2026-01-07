'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { doctors } from '@/lib/data.tsx';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const slideIn = (direction: 'left' | 'right', delay = 0) => ({
  initial: { opacity: 0, x: direction === 'left' ? -100 : 100 },
  whileInView: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  viewport: { once: true, amount: 0.2 },
});


export default function DoctorsPage() {
  return (
    <div className="bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Meet Our Team</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            A team of passionate, experienced, and caring professionals dedicated to your oral health and well-being.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {doctors.map((doctor, index) => {
            const doctorImage = PlaceHolderImages.find((img) => img.id === doctor.imageId);
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={doctor.id}
                variants={slideIn(isEven ? 'left' : 'right')}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.3 }}
              >
                 <Card className={`overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/20 md:grid ${isEven ? 'md:grid-cols-5' : 'md:grid-cols-5'}`}>
                  <div className={`relative h-80 md:h-full ${isEven ? 'md:col-span-2' : 'md:col-span-2'}`}>
                    {doctorImage && (
                      <Image
                        src={doctorImage.imageUrl}
                        alt={`Portrait of ${doctor.name}`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        style={{ objectPosition: doctor.id === 3 ? 'center 20%' : 'center' }}
                        data-ai-hint={doctorImage.imageHint}
                      />
                    )}
                     <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all duration-500"></div>
                  </div>
                   <div className={`p-6 md:p-8 flex flex-col justify-center ${isEven ? 'md:col-span-3 text-left' : 'md:col-span-3 text-left'}`}>
                        <h3 className="font-headline text-2xl font-bold">{doctor.name}</h3>
                        <p className="text-md text-primary font-medium mb-3">{doctor.specialty}</p>
                        <p className="text-muted-foreground mb-4 text-sm">{doctor.bio}</p>
                        <div className="mt-auto">
                            <Button asChild variant="outline">
                                <Link href="/book-appointment">Book with Dr. {doctor.name.split(' ').pop()}</Link>
                            </Button>
                        </div>
                      </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
