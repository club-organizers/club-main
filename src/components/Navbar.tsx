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
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserClub, setCurrentUserClub] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const { data: session } = useSession();
  const pathname = usePathname();
  const currentUser = session?.user?.email;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser) {
        setIsLoading(false); // Stop loading if no user is logged in
        return;
      }

      try {
        const { data, error } = await supabase
          .from('User')
          .select('role, club') // Fetch both role and club
          .eq('email', currentUser)
          .single(); // Fetch a single row

        if (error) {
          console.error('Error fetching user details:', error);
        } else if (data) {
          setCurrentUserRole(data.role); // Set the role from the database
          setCurrentUserClub(data.club); // Set the club from the database
        }
      } catch (err) {
        console.error('Unexpected error fetching user details:', err);
      } finally {
        setIsLoading(false); // Stop loading after fetching is complete
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = 'bg-light';

  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container>
        <Navbar.Brand href="/LandPage" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}>
            <Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} alt="Bowfolios" />
            Club Organizers
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {isLoading ? (
              <Nav.Link disabled>Loading...</Nav.Link> // Show loading indicator
            ) : (
              <>
                {currentUser && (
                  <Nav.Link id={ComponentIDs.homeMenuItem} active={pathname === '/LandPage'} href="/LandPage" key="home">
                    Home
                  </Nav.Link>
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
                {currentUserRole === 'ADMIN' && (
                  <Nav.Link id={ComponentIDs.addProjectMenuItem} active={pathname === '/add'} href="/add" key="add">
                    Add Club
                  </Nav.Link>
                )}
                {currentUserRole === 'OWNER' && currentUserClub === null && (
                  <Nav.Link id={ComponentIDs.addProjectMenuItem} active={pathname === '/add'} href="/add" key="add">
                    Add Club
                  </Nav.Link>
                )}
                {/* Add Club link only accessible to owner */}
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
              </>
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
