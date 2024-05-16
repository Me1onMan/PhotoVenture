const defineMembersWord = (membersCount: number): string => {
  if (membersCount > 10 && membersCount < 20) return 'участников';
  if (membersCount % 10 === 1) return 'участник';
  if (membersCount % 10 === 0) return 'участника';
  if (membersCount % 10 > 1 && membersCount % 10 < 5) return 'участника';
  if (membersCount % 10 > 4 && membersCount % 10 < 10) return 'участников';
  return 'кого-то там...';
};

export default defineMembersWord;
