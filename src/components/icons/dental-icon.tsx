import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export default function DentalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-tooth", props.className)}
      {...props}
    >
      <path d="M9.34 2.11 6.2 5.3A1.5 1.5 0 0 0 7.25 8h9.5a1.5 1.5 0 0 0 1.06-2.7L14.66 2.1a1.5 1.5 0 0 0-2.12 0L10.4 4.24l-1.06-1.06a1.5 1.5 0 0 0-2.12 2.12L9.34 2.11Z" />
      <path d="M7.25 8h9.5l-2.22 7.07a2.5 2.5 0 0 1-4.56 0L7.25 8Z" />
      <path d="m14 15-2-3-2 3" />
      <path d="M12 22a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4Z" />
      <path d="M17.5 14h.5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-.5" />
      <path d="M6.5 14h-.5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.5" />
    </svg>
  );
}
