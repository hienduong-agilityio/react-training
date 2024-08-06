// Components
import ProjectTable from '@/components/ProjectTable';
import Sidebar from '@/components/layout/SideBar';

// Data
import PROJECT_ITEMS from '../database/data.json';

/**
 * The App component as the main view for the application.
 *
 * @returns {JSX.Element} The main structure of the application with a sidebar and project table.
 */
const App = (): JSX.Element => {
  return (
    <main className='flex'>
      <Sidebar />
      <ProjectTable dataTable={PROJECT_ITEMS} />
    </main>
  );
};

export default App;
