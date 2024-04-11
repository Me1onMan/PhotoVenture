import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import navItems from '@/constants/navItems';
import { logout } from '@/firebase';
import { removeActiveUser } from '@/store/slices/activeUserSlice';

import Button from '../UI/Button';

import { Nav, NavItem, NavList } from './styled';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(removeActiveUser());
  };

  return (
    <Nav>
      <NavList>
        <NavItem>
          {navItems.map(({ to, title }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive, isPending }) => {
                if (isPending) return 'pending';
                if (isActive) return 'active';
                return '';
              }}
            >
              {title}
            </NavLink>
          ))}
        </NavItem>
      </NavList>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </Nav>
  );
};

export default Navbar;
