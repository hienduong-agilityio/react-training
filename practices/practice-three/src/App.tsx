// Components
import ProjectTable from '@/components/ProjectTable';
import Sidebar from '@/components/layout/SideBar';
import Navbar from '@/components/layout/NavBar';

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
      <div className='flex flex-col w-full'>
        <Navbar />
        <ProjectTable dataTable={PROJECT_ITEMS} />
      </div>
    </main>
  );
};

export default App;
