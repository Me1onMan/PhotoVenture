import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import usePosts from '@/hooks/usePosts';

import { MapContainer } from './styled';

const MAP_CONTAINER_ID = 'map-container';

const Map = () => {
  const posts = usePosts();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: MAP_CONTAINER_ID,
      center: [27.561824, 53.902287],
      zoom: 10,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
    map.addControl(new mapboxgl.NavigationControl());

    const addMapMarkers = () => {
      posts.forEach((post) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<a href=/post/${post.id}>link</a>`,
        );

        new mapboxgl.Marker().setLngLat(post.data.geoCoordinates).setPopup(popup).addTo(map);
      });
    };

    addMapMarkers();
  }, [posts]);

  return <MapContainer id={MAP_CONTAINER_ID} />;
};

export default Map;
