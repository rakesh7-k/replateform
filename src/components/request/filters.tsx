'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { foodTypes } from '@/lib/data';
import { Search } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: { search: string; type: string; distance: number }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [distance, setDistance] = useState(25);

  const handleFilterChange = (
    newSearch: string,
    newType: string,
    newDistance: number
  ) => {
    onFilterChange({
      search: newSearch,
      type: newType,
      distance: newDistance,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    // Debounce would be good here in a real app
    handleFilterChange(newSearch, type, distance);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    handleFilterChange(search, newType, distance);
  };

  const handleDistanceChange = (newDistance: number[]) => {
    setDistance(newDistance[0]);
    handleFilterChange(search, type, newDistance[0]);
  };

  return (
    <div className="p-4 bg-card rounded-2xl shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by food type or location..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Food Types</SelectItem>
            {foodTypes.map((foodType) => (
              <SelectItem key={foodType} value={foodType}>
                {foodType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-col justify-center gap-2">
            <div className="flex justify-between text-sm">
                <span className="font-medium">Distance</span>
                <span className="text-muted-foreground font-semibold">{distance} km</span>
            </div>
            <Slider
                value={[distance]}
                onValueChange={handleDistanceChange}
                max={50}
                step={1}
            />
        </div>
      </div>
    </div>
  );
}
