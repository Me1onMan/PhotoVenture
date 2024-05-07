import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

import usePosts from '@/hooks/usePosts';
import { selectFilterOptions } from '@/store/slices/filterOptionsSlice';
import searchPosts from '@/utils/searchPosts';

import { TPostProps } from '../PostsContainer/Post/types';
import PostsFilterControl from '../UI/PostsFilterControl';
import Search from '../UI/Search';

import { MapContainer } from './styled';

const MAP_CONTAINER_ID = 'map-container';

const Map = () => {
  const posts = usePosts();

  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<TPostProps[]>(posts);
  const { types, emotions, access } = useSelector(selectFilterOptions);

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
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: MAP_CONTAINER_ID,
      center: [27.561824, 53.902287],
      zoom: 10,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
    map.addControl(new mapboxgl.NavigationControl());

    const addMapMarkers = () => {
      filteredPosts.forEach((post) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<a href=/post/${post.id}>link</a>`,
        );

        new mapboxgl.Marker().setLngLat(post.data.geoCoordinates).setPopup(popup).addTo(map);
      });
    };

    addMapMarkers();
  }, [filteredPosts]);

  return (
    <>
      <Search
        value={searchValue}
        setValue={setSearchValue}
        name="postsSearch"
        placeholder="Search in posts"
      />
      <PostsFilterControl />
      <MapContainer id={MAP_CONTAINER_ID} />
    </>
  );
};

export default Map;
