import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <UtensilsCrossed className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        RePlateform
      </span>
    </Link>
  );
}
