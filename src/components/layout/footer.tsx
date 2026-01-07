import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Our Doctors' },
  { href: '/book-appointment', label: 'Appointments' },
  { href: '/contact', label: 'Contact Us' },
];

const socialLinks = [
  { icon: <Facebook className="w-5 h-5"/>, href: '#', label: 'Facebook' },
  { icon: <Instagram className="w-5 h-5"/>, href: '#', label: 'Instagram' },
  { icon: <Twitter className="w-5 h-5"/>, href: '#', label: 'Twitter' },
  { icon: <Linkedin className="w-5 h-5"/>, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Leading the way in modern dental care for a brighter, healthier community.
            </p>
             <div className="flex space-x-2 mt-4">
              {socialLinks.map((social) => (
                <Button key={social.label} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Dental Ave, Smile City, 12345</li>
              <li><a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a></li>
              <li><a href="mailto:contact@smilehub.com" className="hover:text-primary transition-colors">contact@smilehub.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Clinic Hours</h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Mon - Fri: 9am - 5pm</li>
                <li>Sat: 10am - 2pm</li>
                <li>Sun: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmileHub Dental. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
