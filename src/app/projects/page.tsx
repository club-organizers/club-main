/* eslint-disable import/extensions */
import { Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { PageIDs } from '@/utilities/ids';
import pageStyle from '@/utilities/pageStyle';
import ProjectCardHelper from './ProjectCardHelper';

export const dynamic = 'force-dynamic';

<<<<<<< Updated upstream
const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();
  projects.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <Container id={PageIDs.projectsPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {projects.map((project) => (
          <ProjectCardHelper key={project.id} project={project} />
        ))}
      </Row>
    </Container>
=======
const ProjectPage = () => {
  console.log(supabase);

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [clubs, setClubs] = useState<{ name: string }[] | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase.from('clubs').select();

      if (error) {
        setFetchError('Could not fetch the data');
        setClubs(null);
        console.log(error);
      }
      if (data) {
        setClubs(data);
        setFetchError(null);
      }
    };

    fetchClubs();
  }, []);

  // const pathname = usePathname();
  return (
    <main>
      <Container style={{ marginTop: '20px' }}>
        <Row className="justify-content-center">
          <Col xs={8}>
            <h1 className="text-center">Club Names:</h1>
            <div>
              {fetchError && <p>{fetchError}</p>}
              {clubs && (
                <div className="clubs">
                  {clubs.map((club, index) => (
                    <p key={club.name ?? index}>{club.name}</p>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
>>>>>>> Stashed changes
  );
};

export default ProjectsPage;
