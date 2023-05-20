import { useCallback, useEffect, useState } from 'react';
import { getAddress } from '../../api/client';

const useReverseGeocoding = () => {
  const [position, setPosition] = useState(null);
  const [street, setStreet] = useState(null);
  const [streetNumber, setStreetNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddress = useCallback(async (latitude, longitude) => {
    try {
      const data = await getAddress(latitude, longitude);

      if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;

        const street = addressComponents.find(
          (component) => component.types[0] === 'route'
        )?.long_name;
        const streetNumber = addressComponents.find(
          (component) => component.types[0] === 'street_number'
        )?.long_name;
        const city = addressComponents.find(
          (component) => component.types[0] === 'locality'
        )?.long_name;
        const state = addressComponents.find(
          (component) => component.types[0] === 'administrative_area_level_1'
        )?.long_name;
        const zipCode = addressComponents.find(
          (component) => component.types[0] === 'postal_code'
        )?.long_name;

        return { street, streetNumber, city, state, zipCode };
      } else {
        throw new Error(data.status);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUserPosition = useCallback(async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setPosition(position.coords);
      const addressInfo = await fetchAddress(
        position.coords.latitude,
        position.coords.longitude
      );
      setStreet(addressInfo.street);
      setStreetNumber(addressInfo.streetNumber);
      setCity(addressInfo.city);
      setState(addressInfo.state);
      setZipCode(addressInfo.zipCode);
    } catch (error) {
      setError(error.message);
    }
  }, [fetchAddress]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        if (navigator.geolocation) {
          await getUserPosition();
        } else {
          new Error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getUserPosition]);

  return {
    position,
    street,
    streetNumber,
    city,
    state,
    zipCode,
    error,
    isLoading,
  };
};

export default useReverseGeocoding;
