
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { foodTypes as foodTypeOptions } from '@/lib/data';
import { Loader2, MapPin, Sparkles, CheckCircle, Lightbulb } from 'lucide-react';
import { suggestFoodTypes } from '@/ai/flows/suggest-food-types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';


const formSchema = z.object({
  foodType: z.string().min(1, 'Please select a food type.'),
  mealName: z.string().optional(),
  quantity: z.string().min(1, 'Please enter a quantity.'),
  pickupTime: z.string().min(1, 'Please select a pickup time.'),
  location: z.string().min(1, 'Please provide a location.'),
  contact: z.string().email('Please enter a valid email.').min(1, 'Please provide contact info.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function DonateForm() {
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodType: '',
      mealName: '',
      quantity: '',
      pickupTime: '',
      location: '',
      contact: '',
    },
  });

  const foodType = form.watch('foodType');
  const showMealName = foodType === 'Prepared Meals' || foodType === 'Sandwiches';

  const handleLocation = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, you'd use a geocoding service to convert lat/lng to an address
        const locationString = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        form.setValue('location', locationString, { shouldValidate: true });
        setIsLocating(false);
        toast({ title: 'Location detected successfully!' });
      },
      (error) => {
        setIsLocating(false);
        toast({
          title: 'Error getting location',
          description: error.message,
          variant: 'destructive',
        });
      }
    );
  };

  const handleSuggestion = async () => {
    setIsSuggesting(true);
    try {
      const location = form.getValues('location') || "user's current location";
      const result = await suggestFoodTypes({
        location,
        historicalData: 'donated bread and pastries last month',
      });
      setSuggestions(result.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('AI suggestion error:', error);
      toast({
        title: 'Could not get suggestions',
        description: 'The AI assistant is unavailable right now. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setFormStep(1);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 200);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearInterval(progressInterval);
    setProgress(100);

    // Simulate success
    setTimeout(() => {
        setFormStep(2);
    }, 500);
  };
  
  if (formStep === 1) {
    return (
      <Card className="w-full max-w-2xl mx-auto rounded-2xl">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl">Processing Donation</CardTitle>
            <CardDescription>Please wait while we register your contribution.</CardDescription>
        </CardHeader>
        <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-center mt-4 text-sm text-muted-foreground">{progress}% complete</p>
        </CardContent>
      </Card>
    );
  }
  
  if (formStep === 2) {
    return (
        <Card className="w-full max-w-2xl mx-auto rounded-2xl">
        <CardHeader className="text-center items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl">Donation Submitted!</CardTitle>
            <CardDescription>Thank you for your generosity. Your donation is now visible to people in need.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-lg font-semibold">Reference ID: <span className="font-mono text-primary">DNT-{Date.now().toString().slice(-6)}</span></p>
            <Button onClick={() => { setFormStep(0); form.reset(); setProgress(0); }} className="mt-6">Make Another Donation</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Donate Food</CardTitle>
        <CardDescription>Fill out the form below to list your donation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="foodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a food category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {foodTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showMealName && (
                <FormField
                  control={form.control}
                  name="mealName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Details</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Chicken Biryani, Veggie Sandwich" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="button" variant="outline" size="sm" onClick={handleSuggestion} disabled={isSuggesting}>
                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Get AI Suggestions
              </Button>


              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 20 meals, 3 boxes, 50 loaves" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Pickup Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <div className="flex gap-2">
                        <FormControl>
                        <Input placeholder="Enter address or detect automatically" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={handleLocation} disabled={isLocating}>
                            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                        </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit Donation
            </Button>
          </form>
        </Form>
      </CardContent>

      <AlertDialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><Lightbulb className="text-accent" /> AI Suggestions</AlertDialogTitle>
            <AlertDialogDescription>
              Based on your location and recent trends, here are some needed items:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
            {suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuggestions(false)}>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </Card>
  );
}
