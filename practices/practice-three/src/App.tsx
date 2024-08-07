// Components
import ProjectTable from '@/components/ProjectTable';
import Sidebar from '@/components/layout/SideBar';
import Navbar from '@/components/layout/NavBar';
import SearchBox from '@/components/SearchBox';

// Hooks
import { useProjectContext } from './stores/ProjectProvider';
import { useEffect } from 'react';

// Data
import PROJECT_ITEMS from '../database/data.json';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

/**
 * The App component as the main view for the application.
 *
 * @returns {JSX.Element} The main structure of the application with a sidebar and project table.
 */
const App = (): JSX.Element => {
  const { state, dispatch } = useProjectContext();

  // TODO: Hooking api here
  useEffect(() => {
    if (PROJECT_ITEMS) {
      dispatch({ type: DISPATCH_ACTION.MOCKING_PROJECTS_ITEM, payload: PROJECT_ITEMS });
    }
  }, [dispatch]);

  return (
    <main className='flex'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='pt-5 pb-7 pl-3'>
          <SearchBox />
        </div>
        <ProjectTable dataTable={state.data} />
      </div>
    </main>
  );
};

export default App;
