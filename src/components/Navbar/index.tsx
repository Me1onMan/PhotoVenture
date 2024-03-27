import { NavLink } from 'react-router-dom';

import navItems from '@/constants/navItems';

import { Nav, NavItem, NavList } from './styled';

const Navbar = () => {
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
    </Nav>
  );
};

export default Navbar;
