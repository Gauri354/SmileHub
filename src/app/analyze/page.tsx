'use client';

import { motion } from 'framer-motion';
import { AnalysisForm } from './analysis-form';

export default function AnalyzePage() {
  return (
    <div className="bg-transparent min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">AI-Powered Smile Analysis</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Get instant, confidential insights into your oral health. Upload a photo and let our smart technology provide a preliminary analysis in seconds.
          </p>
        </motion.div>
        <AnalysisForm />
      </div>
    </div>
  );
}
