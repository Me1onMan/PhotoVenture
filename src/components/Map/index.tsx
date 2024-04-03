import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import { MapContainer } from './styled';

const MAP_CONTAINER_ID = 'map-container';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: MAP_CONTAINER_ID,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
    map.addControl(new mapboxgl.NavigationControl());
  }, []);

  return <MapContainer id={MAP_CONTAINER_ID} />;
};

export default Map;
