"use client"

import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { Skeleton } from '@/components/ui/skeleton'

interface InteractiveMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markerPosition?: { lat: number; lng: number }
  height?: string
  width?: string
  apiKey?: string
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = { lat: 37.3861, lng: -122.0839 }, // Default to Silicon Valley
  zoom = 14,
  markerPosition = { lat: 37.3861, lng: -122.0839 },
  height = '400px',
  width = '100%',
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Default to env variable if available
}) => {
  const [showInfoWindow, setShowInfoWindow] = React.useState(false)

  // For demo purposes - if no API key provided, show a message
  if (!apiKey) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 flex items-center justify-center" style={{ height, width }}>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-gray-600 text-sm mb-4">
            Jagran Lakecity University<br />
            D-block boys Hostel<br />
            first floor, room no. 107 & 202
          </p>
          
        </div>
      </div>
    )
  }

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  })

  const mapContainerStyle = {
    height,
    width,
  }

  const handleMarkerClick = () => {
    setShowInfoWindow(!showInfoWindow)
  }

  if (loadError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
        <p>There was an error loading the map. Please try again later.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="rounded-lg overflow-hidden">
        <Skeleton className="w-full h-[400px]" />
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'administrative',
              elementType: 'all',
              stylers: [{ saturation: -100 }],
            },
            {
              featureType: 'administrative.province',
              elementType: 'all',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 65 }, { visibility: 'on' }],
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'simplified' }],
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { visibility: 'simplified' }],
            },
            {
              featureType: 'road.arterial',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 30 }, { visibility: 'on' }],
            },
            {
              featureType: 'road.local',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }],
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { visibility: 'simplified' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ hue: '#ffff00' }, { lightness: -25 }, { saturation: -97 }],
            },
            {
              featureType: 'water',
              elementType: 'labels',
              stylers: [{ lightness: -25 }, { saturation: -100 }],
            },
          ],
        }}
      >
        <Marker
          position={markerPosition}
          onClick={handleMarkerClick}
          icon={{
            url: '/marker-icon.svg',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        >
          {showInfoWindow && (
            <InfoWindow
              position={markerPosition}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div className="p-2">
                <h3 className="font-medium text-gray-900">NextShop Headquarters</h3>
                <p className="text-sm text-gray-600">123 Tech Plaza, Silicon Valley</p>
                <p className="text-sm text-gray-600">California, 94024</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    </div>
  )
}

export default InteractiveMap 