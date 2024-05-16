import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import usePosts from '@/hooks/usePosts';
import { POSTS_PAGE_ROUTE } from '@/router/routes';
import { selectFilterOptions } from '@/store/slices/filterOptionsSlice';
import searchPosts from '@/utils/searchPosts';

import { TPostProps } from '../PostsContainer/Post/types';
import PostsFilterControl from '../UI/PostsFilterControl';
import Search from '../UI/Search';

import { MapContainer, MapWrapper, SearchSection } from './styled';

const MAP_CONTAINER_ID = 'map-container';

const Map = () => {
  const posts = usePosts();

  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<TPostProps[]>(posts);
  const { types, emotions, access } = useSelector(selectFilterOptions);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const mapObj = new mapboxgl.Map({
      container: MAP_CONTAINER_ID,
      center: [27.561824, 53.902287],
      zoom: 10,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
    mapObj.addControl(new mapboxgl.NavigationControl());
    setMap(mapObj);
  }, []);

  useEffect(() => {
    let tempPosts = posts;
    tempPosts = tempPosts.filter((post) => searchPosts(post.data, searchValue));
    if (types.length > 0) {
      tempPosts = tempPosts.filter((post) => types.includes(post.data.postType));
    }
    if (emotions.length > 0) {
      tempPosts = tempPosts.filter((post) => emotions.includes(post.data.emotion));
    }
    if (access.length > 0) {
      tempPosts = tempPosts.filter((post) => access.includes(post.data.access));
    }
    setFilteredPosts(tempPosts);
  }, [posts, searchValue, types, emotions, access]);

  useEffect(() => {
    const addMapMarkers = () => {
      const markersObj = filteredPosts.map((post) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `
          <h1>
            <a href=${POSTS_PAGE_ROUTE}/${post.id}>${post.data.title}</a>
          </h1>
          <p>${post.data.description}<p>
          `,
        );

        return new mapboxgl.Marker().setLngLat(post.data.geoCoordinates).setPopup(popup).addTo(map);
      });

      setMarkers(markersObj);
    };

    if (map) {
      if (markers.length > 0) markers.forEach((marker) => marker.remove());
      addMapMarkers();
    }
  }, [map, filteredPosts]);

  return (
    <>
      <SearchSection>
        <Search
          value={searchValue}
          setValue={setSearchValue}
          name="postsSearch"
          placeholder="Искать в публикациях"
        />
        <PostsFilterControl />
      </SearchSection>
      <MapWrapper>
        <MapContainer id={MAP_CONTAINER_ID} />
      </MapWrapper>
    </>
  );
};

export default Map;
