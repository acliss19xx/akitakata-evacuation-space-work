import { useState, useEffect } from 'react';
import { EvacuationSpace } from '../types/types';

export const useEvacuationSpace = () => {
  const [data, setData] = useState([]);
  const url = 'https://akitakata.acliss.com/get_evacuation_space.php';
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        setData(
          responseData.map((line: EvacuationSpace) => {
            return {
              'name': line['name'],
              'address' : line['address'],
              'tel' : line['tel'],
              'otasuke_phone': line['otasuke_phone'],
              'lat' : line['latitude'],
              'long' : line['longitude'],
              'capacity' : line['capacity'],
              'updated_at': line['updated_at'],
            };
          })
        );
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);
  return data;
}
