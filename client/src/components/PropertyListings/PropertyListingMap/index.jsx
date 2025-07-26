import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { Layer, Map, Marker, NavigationControl, Source } from 'react-map-gl/mapbox';
import './styles.css';

const mapBoxAccessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

function PropertyListingMap({ listings = [], boundary }) {
  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    if (listings.length > 0 && listings[0].coordinates) {
      setViewport({
        latitude: listings[0].coordinates.lat,
        longitude: listings[0].coordinates.lon,
        zoom: 10
      });
      console.log("viewport", viewport);
    }
  }, [listings]);

  if (!viewport) {
    return (
      <section className='property-listing-map'>
        <div className='spinner-container'>
          <FaSpinner className='spinner' />
        </div>
      </section>
    );
  }

  const boundaryGeoJSON = boundary?.coordinates?.length
    ? {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: boundary.type,
              coordinates: [boundary.coordinates, boundary.coordinates[0]]
            },
            properties: {}
          }
        ]
      }
    : null;

  return (
    <section className='property-listing-map'>
      <Map
        mapboxAccessToken={mapBoxAccessToken}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        {...viewport}
        onMove={(e) => setViewport(e.viewState)}
        style={{ width: '100%', height: '100%' }}
      >
        {boundaryGeoJSON && (
          <Source id='boundary' type='geojson' data={boundaryGeoJSON}>
            <Layer
              id='boundary-layer'
              type='line'
              paint={{
                'line-color': '#FFB501',
                'line-width': 3
              }}
            />
          </Source>
        )}
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
