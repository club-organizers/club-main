/* eslint-disable react/jsx-indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
// eslint-disable-next-line import/extensions
import { ComponentIDs } from '@/utilities/ids';
import { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';

const NavBar: React.FC = () => {
  const [, setFetchError] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  const { data: session } = useSession();
  const pathname = usePathname();
  const currentUser = session?.user?.email;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) return;

      try {
        // Query the User table to find the role of the current user
        const { data, error } = await supabase
          .from('User')
          .select('role')
          .eq('email', currentUser)
          .single(); // Fetch a single row

        if (error) {
          setFetchError('Could not fetch user role');
          console.error('Error fetching user role:', error);
        } else if (data) {
          setCurrentUserRole(data.role); // Set the role from the database
        }
      } catch (err) {
        console.error('Unexpected error fetching user role:', err);
        setFetchError('Unexpected error occurred');
      }
    };

    fetchUserRole();
  }, [currentUser]);

  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = currentUser ? 'bg-light' : 'bg-light';
  //console.log('Current User:', currentUser);
  //console.log('Current User Role:', currentUserRole);

  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container>
        <Navbar.Brand href="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}>
            <Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} alt="Bowfolios" />
            Club Organizers
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <Nav.Link id={ComponentIDs.homeMenuItem} active={pathname === '/home'} href="/home" key="home">
                Home
              </Nav.Link>
            ) : (
              ''
            )}
            <Nav.Link
              id={ComponentIDs.information}
              active={pathname === '/information'}
              href="/information"
              key="information"
            >
              Information
            </Nav.Link>
            <Nav.Link
              id={ComponentIDs.information}
              active={pathname === '/register-club'}
              href="/register-club"
              key="register-club"
            >
              Register Club
            </Nav.Link>
            {currentUser && (
              <Nav.Link
                id={ComponentIDs.profilesMenuItem}
                active={pathname === '/profiles'}
                href="/profiles"
                key="profiles"
              >
                Recommended Clubs
              </Nav.Link>
            )}
            <Nav.Link
              id={ComponentIDs.projectsMenuItem}
              active={pathname === '/projects'}
              href="/projects"
              key="projects"
            >
              Clubs
            </Nav.Link>
            <Nav.Link
              id={ComponentIDs.interestsMenuItem}
              active={pathname === '/interests'}
              href="/interests"
              key="interests"
            >
              Search
            </Nav.Link>

            {/* Add Club link only accessible to admin */}
            {currentUserRole === 'admin' && (
              <Nav.Link id={ComponentIDs.interestsMenuItem} href="/add">
                Add Club
              </Nav.Link>
            )}

            {currentUser ? (
              <>
                {/* Add Club link only accessible to admin */}
                {currentUserRole === 'ADMIN' && (
                  <Nav.Link id={ComponentIDs.interestsMenuItem} href="/add">
                    Add Club
                  </Nav.Link>
                )}
              </>
            ) : (
              ''
            )}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser ? (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} href="/auth/signout">
                  <BoxArrowRight />
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                id={ComponentIDs.loginPageLink}
                active={pathname === '/auth/loginPage'}
                href="/auth/loginPage"
                key="loginPage"
              >
                Login/Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;