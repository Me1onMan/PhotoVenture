const isLikedByUser = (userId: string, likedByIds: string[]) => {
  return likedByIds.includes(userId);
};

export default isLikedByUser;
