'use client';

import React, { useEffect, useRef, useState } from 'react';

type AutocompleteResult = {
  description: string;
  placeId: string;
  formattedAddress?: string;
  latLng?: { lat: number; lng: number };
  components?: Record<string, string>;
};

export interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected?: (place: AutocompleteResult) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  countryRestriction?: string[];
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelected,
  placeholder = 'Enter address',
  disabled,
  className,
  countryRestriction,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Google Maps JS
  useEffect(() => {
    const loadGoogleMaps = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window === 'undefined') {
          reject(new Error('Window not available'));
          return;
        }

        if (window.google?.maps?.places) {
          resolve();
          return;
        }

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          reject(new Error('Google Maps API key not found'));
          return;
        }

        const existing = document.getElementById('google-maps');
        const ensureMapsReady = () => {
          if (window.google?.maps?.places) {
            resolve();
          } else {
            setTimeout(ensureMapsReady, 100);
          }
        };

        if (existing) {
          ensureMapsReady();
          return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = ensureMapsReady;
        script.onerror = () => reject(new Error('Failed to load Google Maps'));
        document.head.appendChild(script);
      });
    };

    const initAutocomplete = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await loadGoogleMaps();

        if (!inputRef.current) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            componentRestrictions: countryRestriction
              ? { country: countryRestriction }
              : undefined,
            types: ['address'],
          }
        );

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place) {
            setError('Please select a valid address');
            return;
          }

          const components: Record<string, string> = {};
          if (place.address_components) {
            place.address_components.forEach((component) => {
              component.types.forEach((type) => {
                components[type] = component.long_name;
              });
            });
          }

          const result: AutocompleteResult = {
            description: place.formatted_address || place.name || '',
            placeId: place.place_id || '',
            formattedAddress: place.formatted_address,
            latLng: place.geometry?.location
              ? {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }
              : undefined,
            components,
          };

          onChange(result.formattedAddress || result.description || '');
          onPlaceSelected?.(result);
          setError(null);
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Google Maps error:', err);
        setError('Failed to load address autocomplete');
        setIsLoading(false);
      }
    };

    initAutocomplete();

    return () => {
      autocompleteRef.current = null;
    };
  }, [countryRestriction, onChange, onPlaceSelected]);

  // Keep controlled input synced
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value ?? '';
    }
  }, [value]);

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          isLoading
            ? 'Loading...'
            : error
              ? 'Type address manually'
              : placeholder
        }
        className={className}
        disabled={disabled || isLoading}
      />
      {error && (
        <div className='absolute top-full left-0 mt-1 text-sm text-red-600 bg-white border border-red-200 rounded px-2 py-1 shadow-sm z-10'>
          {error}
        </div>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
