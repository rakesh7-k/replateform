import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Utensils, HandHeart } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center">
          {heroImage && (
             <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="relative z-10 text-center text-foreground px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
              NO PLATE LEFT BEHIND
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
              Join our global network of food heroes and help us create a world with zero hunger and zero food waste.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg px-8 py-6 transform transition-transform duration-200 hover:-translate-y-1">
                <Link href="/donate"><HandHeart className="mr-2"/>Donate Food</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg px-8 py-6 transform transition-transform duration-200 hover:-translate-y-1">
                <Link href="/request"><Utensils className="mr-2"/>Request Food</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
