
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import DonationCard from '@/components/request/donation-card';
import Filters from '@/components/request/filters';
import type { Donation } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { generateQuote } from '@/ai/flows/generate-quote';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useDonations } from '@/context/DonationContext';

export default function RequestPage() {
  const { donations: allDonations } = useDonations();
  const [donations, setDonations] = useState<Donation[]>(allDonations);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    distance: 25,
  });
  const { toast } = useToast();
  const [quote, setQuote] = useState({ text: 'Loading an inspiring quote...', author: '' });
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(true);

  useEffect(() => {
    setDonations(allDonations);
  }, [allDonations]);

  const fetchQuote = async () => {
    setIsGeneratingQuote(true);
    try {
      const newQuote = await generateQuote({ topic: 'food donation for bachelors' });
      setQuote(newQuote);
    } catch (error) {
      console.error('Quote generation error:', error);
      setQuote({ text: 'Sharing a meal is sharing a moment of connection.', author: 'Community Proverb' });
    } finally {
      setIsGeneratingQuote(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  const handleAccept = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Optimistically update UI
    setDonations(prevDonations => prevDonations.filter(d => d.id !== id));
    
    toast({
      title: "Donation Claimed!",
      description: "You've successfully claimed the donation. Pickup details have been sent to you.",
      variant: 'default',
    });
  };

  const filteredDonations = useMemo(() => {
    return donations.filter(donation => {
      const searchLower = filters.search.toLowerCase();
      const typeMatch = filters.type === 'all' || donation.foodType === filters.type;
      const distanceMatch = (donation.distanceKm ?? 0) <= filters.distance;
      const searchMatch =
        donation.foodType.toLowerCase().includes(searchLower) ||
        donation.location.label?.toLowerCase().includes(searchLower);

      return typeMatch && distanceMatch && searchMatch;
    });
  }, [donations, filters]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2 font-headline">Available Donations</h1>
      <p className="text-muted-foreground mb-4">Browse and claim food donations near you.</p>

      <div className="mb-8 p-4 bg-secondary/50 rounded-lg text-center relative">
          <blockquote className="text-lg italic text-foreground/80">"{quote.text}"</blockquote>
          <p className="text-right text-sm font-semibold text-foreground/60 mt-2">- {quote.author}</p>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={fetchQuote} disabled={isGeneratingQuote}>
              <RefreshCw className={`h-4 w-4 ${isGeneratingQuote ? 'animate-spin' : ''}`} />
          </Button>
      </div>

      <Filters onFilterChange={handleFilterChange} />
      
      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonations.map(donation => (
            <DonationCard key={donation.id} donation={donation} onAccept={handleAccept} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-2xl">
          <h2 className="text-2xl font-semibold">No Donations Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
}
