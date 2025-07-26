import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { FaLocationPin } from 'react-icons/fa6';
import { Map, Marker, NavigationControl } from 'react-map-gl/mapbox';
import './styles.css';

const listings = [
  {
    price: '$2450',
    coordinates: [-118.37344, 34.053967],
    link: 'https://example.com/listing/1'
  },
  {
    price: '$3295',
    coordinates: [-118.46554, 34.04678],
    link: 'https://example.com/listing/2'
  }
];

const mapBoxAccessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

function PropertyListingMap({ listings = [] }) {
  const [viewport, setViewport] = useState({
    latitude: listings[0]?.coordinates.lat ?? 34.0522,
    longitude: listings[0]?.coordinates.lon ?? -118.2437,
    zoom: 10
  });

  return (
    <section className='property-listing-map'>
      <Map
        mapboxAccessToken={mapBoxAccessToken}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        {...viewport}
        onMove={(e) => setViewport(e.viewState)}
        style={{ width: '100%', height: '100%' }}
      >
        {listings.map((listing, index) => (
          <Marker
            key={index}
            latitude={listing.coordinates.lat}
            longitude={listing.coordinates.lon}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '-30%',
                  left: '-50%',
                  color: 'black',
                  background: 'white',
                  borderRadius: '50%',
                  padding: '5px 10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: '#1BFFFF'
                }}
                onClick={() => window.open(listing.url, '_blank')}
              >
                {listing.price}
              </div>
              <FaLocationPin size={30} color='#1BFFFF' />
            </div>
          </Marker>
        ))}
        <NavigationControl position='top-right' />
      </Map>
    </section>
  );
}

export default PropertyListingMap;
