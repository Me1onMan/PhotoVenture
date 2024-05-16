import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@/components/UI/Button';
import addUserToGroup from '@/firebase/actions/addUserToGroup';
import removeUserFromGroup from '@/firebase/actions/removeUserFromGroup';
import usePhotoFromFirestore from '@/hooks/usePhotoFromFirestore';
import useUser from '@/hooks/useUser';
import { GROUPS_PAGE_ROUTE } from '@/router/routes';
import { selectActiveUser } from '@/store/slices/activeUserSlice';
import defineMembersWord from '@/utils/defineMembersWord';

import {
  Access,
  BottomSection,
  ButtonContainer,
  Description,
  GroupCardContainer,
  IconProfile,
  InfoBlock,
  Members,
  Owner,
  OwnerInfo,
  Telegram,
  Title,
  TopSection,
} from './styled';
import { TGroupCardProps } from './types';

const GroupCard: FC<TGroupCardProps> = ({ id, data }) => {
  const { title, description, access, membersId, ownerId, photoLink } = data;
  const photo = usePhotoFromFirestore(photoLink);
  const { id: activeUserId } = useSelector(selectActiveUser);

  const [author, isAuthorLoading] = useUser(ownerId);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isActiveUserInGroup = () => {
    return membersId.includes(activeUserId);
  };

  const isShowButton = () => {
    if (access === 'public') return true;
    if (access === 'private' && isActiveUserInGroup()) return true;
    return false;
  };

  const joinGroup = async () => {
    try {
      setIsLoading(true);
      if (isActiveUserInGroup()) await removeUserFromGroup(id, membersId, activeUserId);
      else await addUserToGroup(id, membersId, activeUserId);
    } catch (error) {
      throw new Error('Error occured in GroupCard joinGroup()');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GroupCardContainer>
      <TopSection>
        {photoLink && <IconProfile src={photo} alt={title} />}
        <InfoBlock>
          <Title>
            <Link to={`${GROUPS_PAGE_ROUTE}/${id}`}>{title}</Link>
          </Title>
          <Description>{description}</Description>
          {isAuthorLoading ? (
            <h4>Loading author...</h4>
          ) : (
            <OwnerInfo>
              <Owner>{author.data.login}</Owner>
              <Telegram>@{author.data.telegramLink}</Telegram>
            </OwnerInfo>
          )}
        </InfoBlock>
      </TopSection>
      <BottomSection>
        <Members>
          {membersId.length} {defineMembersWord(membersId.length)}
        </Members>
        <Access>{access}</Access>
        {isShowButton() && (
          <ButtonContainer>
            <Button onClick={joinGroup} type="button" disabled={isLoading}>
              {isActiveUserInGroup() ? 'Покинуть' : 'Вступить'}
            </Button>
          </ButtonContainer>
        )}
      </BottomSection>
    </GroupCardContainer>
  );
};

export default GroupCard;
