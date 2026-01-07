'use server';

import {
  analyzeDentalPhoto,
  type DentalAnalysisOutput,
} from '@/ai/ai-dental-analysis';
import { doctors } from '@/lib/data';

// Function to map the AI's recommended doctor type to a specific doctor from our list
// Function to map the AI's recommended doctor type to a specific doctor from our list
function getDoctorByName(recommendation: string): string {
  const rec = recommendation.toLowerCase();

  // 1. Endodontics & Implants (Dr. Samuel Jones)
  if (rec.includes('implant') || rec.includes('root canal') || rec.includes('endodontist') || rec.includes('missing')) {
    return doctors.find(d => d.specialty.toLowerCase().includes('endodontics'))?.name || "Dr. Samuel Jones";
  }

  // 2. Pediatrics (Dr. Aliyah Chen)
  if (rec.includes('pediatric') || rec.includes('child') || rec.includes('kid')) {
    return doctors.find(d => d.specialty.toLowerCase().includes('pediatric'))?.name || "Dr. Aliyah Chen";
  }

  // 3. Orthodontics (Dr. Marcus Thorne)
  if (rec.includes('ortho') || rec.includes('braces') || rec.includes('aligner')) {
    return doctors.find(d => d.specialty.toLowerCase().includes('orthodontics'))?.name || "Dr. Marcus Thorne";
  }

  // 4. Default: General & Cosmetic (Dr. Evelyn Reed)
  return doctors.find(d => d.specialty.toLowerCase().includes('general'))?.name || "Dr. Evelyn Reed";
}


export async function getAiAnalysis(
  formData: FormData
): Promise<{ data: DentalAnalysisOutput | null; error: string | null }> {
  try {
    const photoDataUri = formData.get('image') as string;

    if (!photoDataUri) {
      return { data: null, error: 'No image provided for analysis.' };
    }

    const result = await analyzeDentalPhoto({ photoDataUri });

    // Map the generic doctor recommendation to a specific one from our list
    const specificDoctor = getDoctorByName(result.recommendedDoctor);

    const finalResult = {
      ...result,
      recommendedDoctor: specificDoctor
    };

    return { data: finalResult, error: null };
  } catch (error: any) {
    console.error('Analysis Error:', error);
    return { data: null, error: error.message || 'Failed to analyze the image. Please try again.' };
  }
}
