"use client"; 

import { useState, useEffect } from 'react';

type GeolocationData = {
  city?: string;
  country?: string;
  flag?: string;
  countryRegion?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
};

export default function MyLocationPage() {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Make a GET request to your API route
        const response = await fetch('/api/geolocation');
        
        if (!response.ok) {
          throw new Error('Failed to fetch geolocation data');
        }

        const data: GeolocationData = await response.json();
        setLocation(data);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function
    fetchLocation();
  }, []); // The empty dependency array [] ensures this effect runs only once on mount

  // Render content based on the state
  if (isLoading) {
    return <div>Loading your location...</div>;
  }

  return (
    <div>
      <h1>Your Geolocation Details</h1>
      {location ? (
        <ul>
          <li><strong>Country:</strong> {location.country} {location.flag}</li>
          <li><strong>City:</strong> {location.city}</li>
          <li><strong>Region:</strong> {location.countryRegion}</li>
          <li><strong>Latitude:</strong> {location.latitude}</li>
          <li><strong>Longitude:</strong> {location.longitude}</li>
        </ul>
      ) : (
        <p>Could not determine your location.</p>
      )}
      
      <hr />
      <h2>Raw JSON Data:</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '5px' }}>
        <code>{JSON.stringify(location, null, 2)}</code>
      </pre>
    </div>
  );
}