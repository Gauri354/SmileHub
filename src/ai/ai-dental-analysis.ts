// This is an AI-powered dental analysis flow that takes a photo of teeth as input, identifies potential issues, suggests treatments, and recommends doctors.

'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DentalAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the patient's teeth, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type DentalAnalysisInput = z.infer<typeof DentalAnalysisInputSchema>;

const DentalAnalysisOutputSchema = z.object({
  analysis: z.string().describe('The AI analysis of the dental photo, identifying specific potential issues like cavities, gingivitis, or staining.'),
  suggestion: z.string().describe('Suggested treatments based on the analysis (e.g., "Professional Cleaning", "Dental Filling").'),
  recommendedDoctor: z.string().describe('A recommended type of specialist for the suggested treatments (e.g., "General Dentist", "Orthodontist").'),
  afterPhotoDataUri: z.string().describe("A data URI of the 'after' photo, showing the result of the suggested treatment. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer about the limitations of the AI analysis and the need for professional consultation. This should be friendly and reassuring.'
    )
    .default('This AI analysis is for informational purposes only and is not a substitute for a professional dental diagnosis. Please consult with a qualified dentist for any health concerns.'),
});

export type DentalAnalysisOutput = z.infer<typeof DentalAnalysisOutputSchema>;

export async function analyzeDentalPhoto(
  input: DentalAnalysisInput
): Promise<DentalAnalysisOutput> {
  return dentalAnalysisFlow(input);
}

const dentalAnalysisPrompt = ai.definePrompt({
  name: 'dentalAnalysisPrompt',
  input: { schema: DentalAnalysisInputSchema },
  output: { schema: DentalAnalysisOutputSchema.omit({ afterPhotoDataUri: true }) },
  prompt: `You are a helpful and friendly AI dental assistant. Your goal is to analyze a dental photo with 99% accuracy and provide a preliminary assessment.

Analyze the provided photo of teeth. Based on what you see, identify potential issues such as cavities, gingivitis, enamel erosion, crowding, or staining.

- For the 'analysis' field, provide a concise summary of your findings.
- For the 'suggestion' field, suggest a likely treatment for the issues you found.
- For the 'recommendedDoctor' field, recommend a type of specialist who would handle such a treatment.
- The 'disclaimer' field has a default value, so you don't need to generate it unless you want to customize it.

Do not diagnose diseases or give definitive medical advice. Frame your response in a helpful, accessible, and reassuring tone.

Here are some examples of good responses:
- Analysis: "I've noticed some inflammation along the gumline, which could be a sign of early gum disease (gingivitis)." Suggestion: "A professional cleaning and improved hygiene routine would be a great next step." Recommended Doctor: "General Dentist".
- Analysis: "There appears to be a small dark spot on one of the back molars. This might be a cavity or just a surface stain." Suggestion: "A dental check-up with an X-ray can determine if a filling is needed." Recommended Doctor: "General Dentist".
- Analysis: "The teeth seem to show some slight overlapping, which is known as crowding." Suggestion: "An orthodontic consultation could explore options like braces or clear aligners." Recommended Doctor: "Orthodontist".

Photo: {{media url=photoDataUri}}
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_MEDICAL',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE'
      }
    ],
  },
});

const dentalAnalysisFlow = ai.defineFlow(
  { name: 'dentalAnalysisFlow', inputSchema: DentalAnalysisInputSchema, outputSchema: DentalAnalysisOutputSchema },
  async input => {
    try {
      // 1. Get the text-based analysis first
      const { output: textOutput } = await dentalAnalysisPrompt(input);
      if (!textOutput) {
        throw new Error("The AI model could not analyze the image. Please try again with a clearer photo.");
      }

      // 2. Generate the "after" image based on the suggestion
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          { media: { url: input.photoDataUri } },
          { text: `Based on the suggested dental treatment "${textOutput.suggestion}", generate a realistic "after" image showing the result on these teeth.` },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      if (!media?.url) {
        throw new Error("Could not generate the 'after' image. Please try again.");
      }

      // 3. Combine text analysis and the new image
      return {
        ...textOutput,
        afterPhotoDataUri: media.url,
      };
    } catch (error) {
      console.warn("AI Analysis Failed (likely due to missing credentials). Falling back to demo mode.", error);

      // randomize the mock response to simulate different analyses
      const scenarios = [
        {
          analysis: "AI Analysis (Demo Mode): The analysis suggests mild discoloration and surface staining on the enamel. No major structural issues are detected, but the shade could be significantly improved.",
          suggestion: "Professional Teeth Whitening",
          recommendedDoctor: "General Dentist",
          afterPhotoDataUri: "/images/whitening-after-new.jpg"
        },
        {
          analysis: "AI Analysis (Demo Mode): The image indicates some misalignment and crowding of the teeth. The bite alignment could be optimized for both aesthetics and long-term oral health.",
          suggestion: "Orthodontic Treatment (Braces/Aligners)",
          recommendedDoctor: "Orthodontist",
          afterPhotoDataUri: "/images/ortho-after-new.png"
        },
        {
          analysis: "AI Analysis (Demo Mode): The scan detects a gap consistent with a missing tooth. The surrounding gum tissue appears healthy enough to support a restorative solution.",
          suggestion: "Dental Implant or Bridge",
          recommendedDoctor: "Implant Specialist",
          afterPhotoDataUri: "/images/implants-after-new.png"
        }
      ];

      // Pseudo-analyze the image: Use the image data length to deterministically pick a scenario.
      // This ensures the same image always gets the same result, but different images likely get different results.
      const index = input.photoDataUri.length % scenarios.length;
      const selectedScenario = scenarios[index];

      console.log(`Demo Mode: Selected scenario ${index} based on image data length.`);

      return {
        ...selectedScenario,
        disclaimer: "⚠️ DEMO MODE ACTIVE: This analysis is RANDOMLY GENERATED because the Gemini API Key is missing. The system cannot see your photo without this key. To enable real AI image analysis, please configure a valid GEMINI_API_KEY in your environment variables.",
      };
    }
  }
);
