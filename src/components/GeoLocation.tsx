import React, { useState, useEffect } from 'react';

type GeoLocationProps = {
  onLocationChange: (location: [number, number]) => void;
};

export const GeoLocation = (props: GeoLocationProps) => {
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Error obtaining geolocation: ", error);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return (
    <div className="geo-button-wrap">
      <button onClick={() => {
        if (currentPosition) {
          props.onLocationChange(currentPosition);
        } else {
          console.error("Current position is not available.");
        }
      }}>現在地を取得</button>
    </div>
  );
};