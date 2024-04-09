import { FC, useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import { MapContainer } from './styled';
import { TMapSelectProps } from './types';

const MAP_CONTAINER_ID = 'map-container';

const Map: FC<TMapSelectProps> = ({ setLat, setLng }) => {
  let marker;

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: MAP_CONTAINER_ID,
      center: [27.561824, 53.902287],
      zoom: 10,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
    map.addControl(new mapboxgl.NavigationControl());

    map.on('click', (e) => {
      if (marker) marker.remove();
      marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
      console.log(e.lngLat);
    });
  }, []);

  return <MapContainer id={MAP_CONTAINER_ID} />;
};

export default Map;
