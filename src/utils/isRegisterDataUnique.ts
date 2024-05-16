import getUsers from '@/firebase/actions/getUsers';

const isRegisterDataUnique = async (login: string, email: string) => {
  const usersData = await getUsers();
  const filteredData = usersData.filter(
    (userData) => userData.data.email === email || userData.data.login === login,
  );
  return filteredData.length === 0;
};

export default isRegisterDataUnique;
