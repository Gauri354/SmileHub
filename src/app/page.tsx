'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  HeartPulse,
  Award,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  Smile,
  Users,
  FlaskConical,
  Heart,
  Plus,
  Trophy,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { services, doctors, testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fadeIn = (delay = 0, duration = 0.8) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  viewport: { once: true, amount: 0.2 }
});

const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.8 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.4, 0, 0.2, 1],
      type: 'spring',
      stiffness: 150,
      damping: 15
    },
  },
  viewport: { once: true, amount: 0.5 }
});


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

const blurIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
  whileInView: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  viewport: { once: true, amount: 0.3 }
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  whileInView: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  viewport: { once: true, amount: 0.2 },
});

const whyChooseUsItems = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Experienced Specialists",
    description: "Our team consists of highly qualified and experienced dental professionals."
  },
  {
    icon: <Smile className="w-8 h-8 text-primary" />,
    title: "Individual Approach",
    description: "We tailor our treatment plans to meet your unique needs and preferences."
  },
  {
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "Modern Equipment",
    description: "We use the latest technology for accurate diagnoses and effective treatments."
  },
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Comfortable Atmosphere",
    description: "We strive to make your visit as comfortable and stress-free as possible."
  }
];

export default function Home() {
  const aboutClinicImage = PlaceHolderImages.find((img) => img.id === 'clinic-interior');
  const heroToothImage = PlaceHolderImages.find((img) => img.id === 'hero-tooth');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/90 text-primary-foreground relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={staggerContainer(0.2, 0.1)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-left z-20"
            >
              <motion.div variants={fadeIn()} className="mb-6">
                <span className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-white text-sm font-semibold inline-flex items-center gap-2 backdrop-blur-md">
                  <span className="text-yellow-400">★★★★★</span> Trusted by 10,000+ Patients
                </span>
              </motion.div>

              <motion.h1
                variants={fadeIn(0.2, 0.8)}
                className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6 drop-shadow-lg"
              >
                <span className="text-white">Healthy Teeth,</span> <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">Happy Life</span>
              </motion.h1>

              <motion.p
                variants={fadeIn()}
                className="max-w-xl text-lg md:text-xl mb-8 text-blue-100/90 font-light"
              >
                Experience world-class dental care in a calm and welcoming environment. Let us help you achieve the healthy, confident smile you deserve.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4 mb-10"
                variants={fadeIn()}
              >
                <Button asChild size="lg" className="rounded-full text-lg px-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:scale-105 bg-white text-primary hover:bg-white/90">
                  <Link href="/book-appointment">Book Appointment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full text-lg px-8 border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                  <Link href="#services">Our Services</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeIn()} className="flex items-center gap-6 md:gap-10 text-sm font-medium text-blue-100/80 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30 backdrop-blur-md">
                    <Users className="w-5 h-5 text-blue-200" />
                  </div>
                  <div className="leading-tight">
                    <span className="block font-bold text-white text-lg">15+</span>
                    <span>Specialists</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30 backdrop-blur-md">
                    <Smile className="w-5 h-5 text-blue-200" />
                  </div>
                  <div className="leading-tight">
                    <span className="block font-bold text-white text-lg">5k+</span>
                    <span>Happy Smiles</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30 backdrop-blur-md">
                    <Trophy className="w-5 h-5 text-blue-200" />
                  </div>
                  <div className="leading-tight">
                    <span className="block font-bold text-white text-lg">#1</span>
                    <span>Clinic Award</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <div className="relative row-start-1 md:row-auto h-96 md:h-[600px] flex items-center justify-center p-6">
              {heroToothImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-white/20"
                >
                  <Image
                    src={heroToothImage.imageUrl}
                    alt={heroToothImage.description}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroToothImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              )}
            </div>
          </div>
        </section>


        {/* Services Section */}
        <section className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeIn(0.2)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Prices and Services</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Comprehensive care for every dental need, from routine check-ups to advanced cosmetic procedures.
              </p>
            </motion.div>
            <motion.div
              className="max-w-7xl mx-auto"
              variants={staggerContainer(0.1, 0.2)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => {
                  let imageId = 'service-general';
                  if (service.slug === 'teeth-whitening') imageId = 'service-whitening';
                  if (service.slug === 'dental-implants') imageId = 'service-implants';
                  if (service.slug === 'orthodontics') imageId = 'service-orthodontics';
                  if (service.slug === 'general-dentistry') imageId = 'service-general';
                  if (service.slug === 'pediatric-dentistry') imageId = 'service-pediatric';
                  if (service.slug === 'root-canal-therapy') imageId = 'service-root-canal';

                  const serviceImage = PlaceHolderImages.find((img) => img.id === imageId);

                  return (
                    <motion.div
                      key={service.slug}
                      variants={blurIn()}
                      className="flex"
                      whileHover={{ y: -8, scale: 1.02, rotateZ: 0.5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="flex flex-col overflow-hidden w-full transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/20 group hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        <div className="relative h-48 w-full overflow-hidden">
                          {serviceImage && (
                            <Image
                              src={serviceImage.imageUrl}
                              alt={service.title}
                              fill
                              className="object-contain p-2 group-hover:scale-110 transition-transform duration-700"
                              data-ai-hint={serviceImage.imageHint}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                        </div>
                        <CardContent className="flex flex-col flex-grow p-6 relative">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-primary font-bold text-lg">0{index + 1}</span>
                            <h3 className="text-xl font-headline font-bold line-clamp-1">{service.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {service.details.explanation}
                          </p>
                          <div className="mt-auto">
                            <Button asChild variant="default" className="w-full group-hover:bg-primary/90 transition-colors">
                              <Link href={`/services/${service.slug}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-secondary/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeIn(0.2)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Dedicated care and unparalleled expertise for your brightest smile.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer(0.15, 0.3)}
              initial="initial"
              whileInView="whileInView"
            >
              {whyChooseUsItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={popIn()}
                  whileHover="hover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-8 h-full border-2 border-transparent hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 text-primary relative z-10"
                      variants={{
                        hover: {
                          scale: 1.1,
                          rotate: 360,
                          backgroundColor: "rgba(59, 130, 246, 0.2)"
                        }
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                    <p className="text-muted-foreground text-sm relative z-10">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Clinic Section */}
        <section className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            >
              <motion.div variants={slideIn('left')}>
                <h2 className="font-headline text-3xl md:text-4xl font-bold">About Our Clinic</h2>
                <p className="mt-4 text-lg text-muted-foreground mb-6">
                  We are a team of professional dentists who have been working for you for over 10 years. In our clinic, you'll find cutting-edge technologies, high-quality service, and care for your comfort. We strive to make your visit to the dentist as pleasant as possible.
                </p>
                <Button asChild size="lg" className="rounded-full transform hover:scale-105 transition-transform">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </motion.div>
              <motion.div variants={slideIn('right')} className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                {aboutClinicImage && (
                  <Image
                    src={aboutClinicImage.imageUrl}
                    alt={aboutClinicImage.description}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint={aboutClinicImage.imageHint}
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="py-16 md:py-24 bg-secondary/20 backdrop-blur-sm overflow-x-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeIn(0.2)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: false, amount: 0.3 }}
            >
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Team</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our team of dedicated and experienced professionals is here to provide you with the best care.
              </p>
            </motion.div>
            <div className="space-y-12 max-w-4xl mx-auto">
              {doctors.slice(0, 4).map((doctor, index) => {
                const doctorImage = PlaceHolderImages.find((img) => img.id === doctor.imageId);
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={doctor.id}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <Card className={`overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/80 backdrop-blur-sm border-border/20 md:grid ${isEven ? 'md:grid-cols-5' : 'md:grid-cols-5'}`}>
                      <motion.div
                        variants={slideIn('left')}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false, amount: 0.3 }}
                        className={`relative h-80 md:h-full ${isEven ? 'md:col-span-2' : 'md:col-span-2'}`}
                      >
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
                      </motion.div>
                      <motion.div
                        variants={slideIn('right')}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false, amount: 0.3 }}
                        className={`p-6 md:p-8 flex flex-col justify-center ${isEven ? 'md:col-span-3 text-left' : 'md:col-span-3 text-left'}`}
                      >
                        <h3 className="font-headline text-2xl font-bold">{doctor.name}</h3>
                        <p className="text-md text-primary font-medium mb-3">{doctor.specialty}</p>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{doctor.bio}</p>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold min-w-[100px] text-primary">Education:</span>
                            <span className="text-muted-foreground">{doctor.education}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold min-w-[100px] text-primary">Languages:</span>
                            <span className="text-muted-foreground">{doctor.languages}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold min-w-[100px] text-primary">Certifications:</span>
                            <span className="text-muted-foreground">{doctor.certifications}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold min-w-[100px] text-primary">Experience:</span>
                            <span className="text-muted-foreground font-medium">{doctor.experience}</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Button asChild variant="outline">
                            <Link href="/book-appointment">Book with Dr. {doctor.name.split(' ').pop()}</Link>
                          </Button>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <motion.div className="text-center mt-12" variants={fadeIn(0.3)} initial="initial" whileInView="whileInView" viewport={{ once: false }}>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/doctors">Meet The Full Team</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeIn(0.2)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Patients Say</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Stories of smiles we've helped create.
              </p>
            </motion.div>
            <motion.div
              variants={popIn(0.3)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="w-full overflow-hidden"
            >
              <motion.div
                className="flex gap-6"
                initial={{ x: "-50%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
                  const patientImage = PlaceHolderImages.find((img) => img.id === testimonial.imageId);
                  return (
                    <div key={`${testimonial.id}-${index}`} className="w-[350px] flex-shrink-0">
                      <Card className="h-full hover:bg-secondary/50 transition-colors bg-card/80 backdrop-blur-sm border-border/20">
                        <CardContent className="flex flex-col items-center text-center p-8 h-full">
                          <MessageSquare className="w-8 h-8 text-primary mb-4" />
                          <p className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</p>
                          <div className="flex items-center">
                            {patientImage && (
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={patientImage.imageUrl} alt={testimonial.name} data-ai-hint={patientImage.imageHint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <p className="font-headline font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-secondary/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div
              variants={popIn(0.2, 0.7)}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div className="bg-primary rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden text-primary-foreground">
                <div className="relative z-10">
                  <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready for Your Best Smile?</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80 mb-8">
                    Schedule your appointment today and take the first step towards a healthier, more confident you.
                  </p>
                  <Button asChild size="lg" variant="secondary" className="rounded-full transform hover:scale-105 transition-transform">
                    <Link href="/book-appointment">Book Your Visit Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
