'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data.tsx';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const popIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Dental Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            From routine care to transformative cosmetic treatments, we offer a full spectrum of services to meet your needs.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div key={service.slug} variants={popIn}>
              <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-xl border-border/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      {service.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button asChild variant="link" className="px-0 font-semibold text-primary self-start">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
