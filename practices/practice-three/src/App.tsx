// Components
import ProjectTable from '@/components/ProjectTable';
import Sidebar from '@/components/layout/SideBar';
import Navbar from '@/components/layout/NavBar';
import SearchBox from '@/components/SearchBox';
import ProjectModalForm from '@/components/ProjectModalForm';
import Button from '@/components/common/Button';

// Hooks
import { useProjectContext } from '@/stores/ProjectProvider';
import { useEffect, useState } from 'react';

// Data
import PROJECT_ITEMS from '../database/data.json';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

// Enums
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '@/enums/theme';

// SVG
import addIcon from '/images/addIcon.svg';

/**
 * The App component as the main view for the application.
 *
 * @returns {JSX.Element} The main structure of the application with a sidebar and project table.
 */
const App = (): JSX.Element => {
  const { state, dispatch } = useProjectContext();
  const [isProjectModalFormOpen, setIsProjectModalFormOpen] = useState(false);

  // TODO: Hooking api here
  useEffect(() => {
    if (PROJECT_ITEMS) {
      dispatch({ type: DISPATCH_ACTION.MOCKING_PROJECTS_ITEM, payload: PROJECT_ITEMS });
    }
  }, [dispatch]);

  const handleOpenProjectModalForm = () => setIsProjectModalFormOpen(true);
  const handleCloseProjectModalForm = () => setIsProjectModalFormOpen(false);

  return (
    <main className='flex'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='flex justify-between pt-5 pb-7 px-3'>
          <SearchBox />
          <Button
            variant={BUTTON_VARIANTS.CONTAINED}
            size={BUTTON_SIZES.SMALL}
            color={BUTTON_COLORS.PRIMARY}
            onClick={handleOpenProjectModalForm}
          >
            <img src={addIcon} className='w-3 h-3' alt='Add' />
            New Project
          </Button>
          <ProjectModalForm
            title='Add new project'
            isOpen={isProjectModalFormOpen}
            onClose={handleCloseProjectModalForm}
          />
        </div>
        <ProjectTable dataTable={state.data} />
      </div>
    </main>
  );
};

export default App;
