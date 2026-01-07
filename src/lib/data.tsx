import React from 'react';
import DentalIcon from '@/components/icons/dental-icon';
import { Sparkles, Bone, Smile, Stethoscope } from 'lucide-react';

export const services = [
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Brighten your smile with our professional whitening services.',
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    comparison: {
      beforeImageId: 'service-whitening-before',
      afterImageId: 'service-whitening-after',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    details: {
      explanation: 'Our professional teeth whitening is a fast, effective, and safe way to remove stains and discoloration, giving you a noticeably brighter smile. We use advanced, clinically proven techniques to achieve stunning results in just one visit.',
      benefits: ['Dramatically whiter teeth', 'Boosted self-confidence', 'Fast and convenient treatment', 'Safe and effective procedure'],
      duration: 'Approx. 60-90 minutes',
      cost: '$300 - $600',
    },
  },
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    description: 'A permanent solution for missing teeth that looks and feels natural.',
    icon: <Bone className="h-6 w-6 text-primary" />,
    comparison: {
      beforeImageId: 'service-whitening-before', // Placeholder reuse until we have specific ones
      afterImageId: 'service-implants',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    details: {
      explanation: 'Dental implants are the gold standard for replacing missing teeth. A titanium post is surgically placed into the jawbone, acting as a root for a custom-made crown. The result is a strong, stable, and natural-looking tooth.',
      benefits: ['Permanent tooth replacement', 'Prevents bone loss', 'Restores full chewing power', 'Looks and feels like a natural tooth'],
      duration: 'Multiple visits over 3-6 months',
      cost: '$2000 - $5000 per implant',
    },
  },
  {
    slug: 'orthodontics',
    title: 'Orthodontics & Braces',
    description: 'Align your teeth for a perfect smile and improved oral health.',
    icon: <Smile className="h-6 w-6 text-primary" />,
    comparison: {
      beforeImageId: 'service-whitening-before', // Placeholder reuse
      afterImageId: 'service-orthodontics',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    details: {
      explanation: 'Orthodontic treatments, including traditional braces and clear aligners, correct misaligned teeth and jaws. A proper bite improves oral hygiene, function, and aesthetics, giving you a confident and healthy smile.',
      benefits: ['Straighter teeth and beautiful smile', 'Improved bite and jaw function', 'Easier cleaning and better oral health', 'Increased self-esteem'],
      duration: '12-36 months on average',
      cost: '$3000 - $8000',
    },
  },
  {
    slug: 'general-dentistry',
    title: 'General Dentistry',
    description: 'Comprehensive check-ups, cleanings, and fillings for all ages.',
    icon: <Stethoscope className="h-6 w-6 text-primary" />,
    comparison: {
      beforeImageId: 'service-whitening-before', // Placeholder reuse
      afterImageId: 'service-general',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    details: {
      explanation: 'General dentistry is focused on the prevention, diagnosis, and treatment of a wide variety of conditions affecting teeth, gums, and oral health. It includes regular check-ups, professional cleanings, fillings, and patient education.',
      benefits: ['Prevents cavities and gum disease', 'Maintains overall oral health', 'Early detection of potential issues', 'Professional guidance on home care'],
      duration: '30-60 minutes per visit',
      cost: '$100 - $300 for check-up and cleaning',
    },
  },
  {
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    description: 'Gentle and friendly dental care for your little ones.',
    icon: <Smile className="h-6 w-6 text-primary" />,
    comparison: {
      beforeImageId: 'service-whitening-before', // Placeholder reuse
      afterImageId: 'service-pediatric',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    details: {
      explanation: 'Pediatric dentistry provides specialized dental care for children from infancy through adolescence. We create a positive, fun environment to ensure your child feels comfortable and develops healthy oral hygiene habits for life.',
      benefits: ['Specialized care for children\'s developing teeth', 'Positive and comfortable environment', 'Focus on prevention and education', 'Early detection of developmental issues'],
      duration: '30-45 minutes per visit',
      cost: '$80 - $200 per visit',
    },
  },
  {
    slug: 'root-canal-therapy',
    title: 'Root Canal Therapy',
    description: 'Save your natural tooth and relieve pain with endodontic treatment.',
    icon: <DentalIcon className="h-6 w-6 text-primary" />,
    comparison: {
      beforeImageId: 'service-whitening-before', // Placeholder reuse
      afterImageId: 'service-root-canal',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    details: {
      explanation: 'A root canal is a treatment to repair and save a badly damaged or infected tooth instead of removing it. The procedure involves removing the damaged area of the tooth (the pulp), cleaning and disinfecting it, and then filling and sealing it.',
      benefits: ['Saves the natural tooth', 'Relieves severe toothache', 'Prevents infection from spreading', 'Restores normal biting and sensation'],
      duration: '90-120 minutes per visit',
      cost: '$700 - $2000',
    },
  },
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Ananya Iyer',
    specialty: 'General & Cosmetic Dentistry',
    experience: '12+ Years Experience',
    education: 'M.D.S. from Manipal College of Dental Sciences',
    languages: 'English, Hindi, Tamil',
    certifications: 'Indian Academy of Aesthetic & Cosmetic Dentistry',
    bio: 'Dr. Iyer is passionate about creating beautiful smiles. With over a decade of experience, she combines artistry with the latest dental technology to provide exceptional cosmetic and general dental care. She is dedicated to continuous learning and staying at the forefront of dental advancements.',
    imageId: 'doctor-1',
  },
  {
    id: 2,
    name: 'Dr. Rajesh Khanna',
    specialty: 'Orthodontics',
    experience: '15+ Years Experience',
    education: 'M.D.S. from AIIMS, New Delhi',
    languages: 'English, Hindi, Punjabi',
    certifications: 'Indian Orthodontic Society (IOS)',
    bio: 'As our lead orthodontist, Dr. Khanna specializes in correcting misaligned teeth and jaws for both children and adults. He is an expert in traditional braces and is a Diamond Plus Provider of Invisalign clear aligners, ensuring precise and comfortable treatments.',
    imageId: 'doctor-2',
  },
  {
    id: 3,
    name: 'Dr. Meera Patel',
    specialty: 'Pediatric Dentistry',
    experience: '8+ Years Experience',
    education: 'M.D.S. from Government Dental College, Mumbai',
    languages: 'English, Hindi, Gujarati',
    certifications: 'Indian Society of Pedodontics and Preventive Dentistry',
    bio: 'Dr. Patel has a gift for making our youngest patients feel comfortable and safe. She focuses on preventative care and education to set children on the path to a lifetime of healthy smiles. Her gentle approach and fun office environment make dental visits a positive experience.',
    imageId: 'doctor-3',
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    specialty: 'Endodontics & Implants',
    experience: '10+ Years Experience',
    education: 'M.D.S. from Bangalore Institute of Dental Sciences',
    languages: 'English, Hindi, Kannada',
    certifications: 'Federation of Operative Dentistry of India',
    bio: 'Dr. Singh is our specialist in root canal therapy and dental implants. He uses state-of-the-art microscopic techniques for precision and patient comfort. He is dedicated to saving natural teeth whenever possible and providing durable, natural-looking replacements when needed.',
    imageId: 'doctor-4',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Priya S.',
    location: 'Mumbai',
    quote: 'SmileHub has completely changed my perception of going to the dentist. The staff is incredibly friendly, the clinic is beautiful, and Dr. Iyer did a fantastic job on my teeth!',
    imageId: 'patient-1',
  },
  {
    id: 2,
    name: 'Rahul V.',
    location: 'New Delhi',
    quote: 'The AI analysis tool was surprisingly accurate and helpful. It gave me the confidence to book an appointment, and the treatment I received from Dr. Khanna was top-notch. Highly recommend!',
    imageId: 'patient-2',
  },
  {
    id: 3,
    name: 'Sneha G.',
    location: 'Bangalore',
    quote: 'My kids love coming to see Dr. Patel! She is so patient and kind. The whole experience is stress-free for both me and my children. Thank you, SmileHub!',
    imageId: 'patient-3',
  },
];

export const faqs = {
  'teeth-whitening': [
    {
      question: 'Is teeth whitening safe?',
      answer: 'Yes, when performed by a dental professional, teeth whitening is very safe. We use approved, high-quality whitening agents and take precautions to protect your gums and soft tissues.'
    },
    {
      question: 'How long do the results last?',
      answer: 'The results of professional teeth whitening can last from several months to a few years, depending on your diet and oral hygiene habits. Avoiding staining foods and drinks like coffee, tea, and red wine will help prolong the effects.'
    },
    {
      question: 'Will it make my teeth sensitive?',
      answer: 'Some patients may experience temporary tooth sensitivity after a whitening treatment. This typically subsides within a day or two. We can also provide desensitizing treatments to minimize any discomfort.'
    }
  ]
};
