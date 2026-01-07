import DentalIcon from '@/components/icons/dental-icon';
import { cn } from '@/lib/utils';

export default function Logo({ isScrolled }: { isScrolled?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <DentalIcon className={cn("h-7 w-7 text-primary transition-colors", !isScrolled && "text-primary-foreground")} />
      <span className={cn("font-headline text-xl font-bold text-primary transition-colors", !isScrolled && "text-primary-foreground")}>
        SmileHub
      </span>
    </div>
  );
}
