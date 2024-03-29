import { FC, useEffect, useState } from 'react';

import getPostsByGroupId from '@/firebase/actions/getPostsByGroupId';

import Post from '../PostsContainer/Post';
import { TPostProps } from '../PostsContainer/Post/types';

import { Description, GroupContainer, Owner, Title, Type } from './styled';
import { TProps } from './types';

const SingleGroup: FC<TProps> = ({ id, data }) => {
  const { title, description, type, ownerId, membersId } = data;
  const [posts, setPosts] = useState<TPostProps[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Loading posts...');

        const loadedPosts = await getPostsByGroupId(id);
        setPosts(loadedPosts);
        console.log(loadedPosts);
      } catch (error) {
        throw new Error(error);
      }
    };

    loadPosts();
  }, [id]);

  return (
    <GroupContainer>
      <p>groupId: {id}</p>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Type>Type: {type}</Type>
      <Owner>Owner id: {ownerId}</Owner>
      <h3>Members:</h3>
      {membersId.map((memberId, index) => (
        <p key={memberId}>
          {index}: {memberId}
        </p>
      ))}
      <h3>Posts</h3>
      <div>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post.id} id={post.id} data={post.data} />)}
      </div>
    </GroupContainer>
  );
};

export default SingleGroup;
