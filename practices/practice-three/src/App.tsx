// Components
import ProjectTable from '@/components/ProjectTable';
import Sidebar from '@/components/layout/SideBar';
import Navbar from '@/components/layout/NavBar';
import SearchBox from '@/components/SearchBox';
import ProjectModalForm from '@/components/ProjectModalForm/ProjectUpdateForm';
import Button from '@/components/common/Button';
import DeleteConfirmationModal from '@/components/ProjectModalForm/ProjectConfirmForm';

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
import addIcon from '@public/images/addIcon.svg';

// Types
import type { IProjectItemProps } from '@/components/ProjectItem';

/**
 * The App component as the main view for the application.
 *
 * @returns {JSX.Element} The main structure of the application with a sidebar and project table.
 */
const App = (): JSX.Element => {
  const [isProjectModalFormOpen, setIsProjectModalFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { state, dispatch } = useProjectContext();

  // TODO: Hooking api here

  // Load mock data into state
  useEffect(() => {
    if (PROJECT_ITEMS) {
      dispatch({ type: DISPATCH_ACTION.MOCKING_PROJECTS_ITEM, payload: PROJECT_ITEMS });
    }
  }, [dispatch]);

  // Function to handle opening the modal for adding a new project
  const handleOpenAddProjectModalForm = () => {
    setIsEditing(false);
    setIsProjectModalFormOpen(true);
  };

  // Function to handle opening the modal for editing a project
  const handleOpenEditProjectModalForm = (id: string) => {
    const projectToEdit = state.data.find((project: IProjectItemProps) => project.id === id);

    if (projectToEdit) {
      setIsEditing(true);
      setIsProjectModalFormOpen(true);
    }
  };

  const handleCloseProjectModalForm = () => {
    setIsProjectModalFormOpen(false);
    dispatch({ type: DISPATCH_ACTION.CLEAR_SELECTED_PROJECT });
  };

  const handleOpenDeleteModalForm = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    dispatch({ type: DISPATCH_ACTION.CLEAR_SELECTED_PROJECT });
  };

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
            onClick={handleOpenAddProjectModalForm}
          >
            <img src={addIcon} className='w-3 h-3' alt='Add' />
            New Project
          </Button>
          <ProjectModalForm
            title={isEditing ? 'Edit Project' : 'Add New Project'}
            isOpen={isProjectModalFormOpen}
            onClose={handleCloseProjectModalForm}
          />
        </div>
        <ProjectTable
          dataTable={state.data}
          onOpenEdit={handleOpenEditProjectModalForm}
          onDelete={handleOpenDeleteModalForm}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          projectId={state.selectedProjectId}
        />
      </div>
    </main>
  );
};

export default App;
