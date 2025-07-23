import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/Footer/index.jsx';
import ListingContainer from '../components/PropertyDetails/ListingContainer/index.jsx';
import ListingContainerSkeleton from '../components/PropertyDetails/ListingContainer/LoadingSkeleton.jsx';
import PropertyPhotos from '../components/PropertyDetails/PropertyPhotos/index.jsx';
import PropertyPhotosSkeleton from '../components/PropertyDetails/PropertyPhotos/LoadingSkeleton.jsx';

function PropertyDetails() {
  const [propertyDetails, setPropertyDetails] = useState({});
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const listing_id = searchParams.get('listing_id');
  const property_id = searchParams.get('property_id');

  useEffect(() => {
    if (!property_id || !listing_id) {
      console.log('⚠️ Missing required parameters for property details API');
      setError('Missing required parameters');
      setIsLoading(false);
      return;
    }

    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const apiUrl = new URL('https://realtor-search.p.rapidapi.com/properties/detail');
        apiUrl.searchParams.append('propertyId', property_id);
        apiUrl.searchParams.append('listingId', listing_id);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_REALTOR_API_KEY,
            'x-rapidapi-host': 'realtor-search.p.rapidapi.com'
          }
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        
        const newPropertyDetails = {
          property_id: property_id,
          listing_id: listing_id,
          price: data.data.list_price || data.data.list_price_max,
          beds: data.data.description.beds || data.data.description.beds_max,
          baths: data.data.description.baths || data.data.description.baths_max,
          sqft: data.data.description.sqft || data.data.description.sqft_max,
          property_name: data.data.description.name,
          type: data.data.description.type,
          address: data.data.location.address,
          description: data.data.description.text,
          details: data.data.details,
          propertyUrl: data.data.href,
        };

        setPropertyDetails(newPropertyDetails);
        setPropertyPhotos(data.data.photos || []);
        
      } catch (error) {
        console.error('❌ Error fetching property details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [property_id, listing_id]);

  if (error) {
    return (
      <div>
        <NavBar hideOnMobile />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>Error loading property details</h3>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar hideOnMobile />
      {isLoading ? (
        <PropertyPhotosSkeleton />
      ) : (
        <PropertyPhotos photos={propertyPhotos} propertyId={property_id} address={propertyDetails.address} />
      )}
      {isLoading ? (
        <ListingContainerSkeleton />
      ) : (
        <ListingContainer propertyDetails={propertyDetails} />
      )}
      <Footer />
    </div>
  );
}

export default PropertyDetails;
