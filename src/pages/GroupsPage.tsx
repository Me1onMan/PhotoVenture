import AddGroupForm from '@/components/AddGroupForm';
import GroupsContainer from '@/components/GroupsContainer';
import Navbar from '@/components/Navbar';

const GroupsPage = () => {
  return (
    <>
      <Navbar />
      <AddGroupForm />
      <GroupsContainer />
    </>
  );
};

export default GroupsPage;
