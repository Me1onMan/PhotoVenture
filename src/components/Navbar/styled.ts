import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  padding: 20px 60px;

  background-color: ${({ theme }) => theme.backgroundSecondary};

  & button {
    max-width: 200px;
  }
`;

export const NavList = styled.ul`
  list-style: none;

  display: flex;
  gap: 20px;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;

  & a {
    font-size: 24px;
    font-weight: 700;
  }
`;
