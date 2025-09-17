import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-headline">
              Save Food. Feed People. Map the Impact.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
              Join our community to reduce food waste and support those in need. Your contribution, big or small, makes a world of difference.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-lg px-8 py-6 transform transition-transform duration-200 hover:-translate-y-1">
                <Link href="/donate">Donate Food</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-lg px-8 py-6 transform transition-transform duration-200 hover:-translate-y-1">
                <Link href="/request">Request Food</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
