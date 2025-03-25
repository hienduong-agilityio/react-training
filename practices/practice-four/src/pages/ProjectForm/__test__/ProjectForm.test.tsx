// Libraries
import { render, screen } from '@testing-library/react';

// Pages
import { ProjectFormPage } from '@/pages';

// Hooks
import { useProject } from '@/hooks';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ id: '1' }),
  useNavigate: jest.fn()
}));

jest.mock('@/hooks/useProject');

jest.mock('@/stores/toastStore', () => ({
  ToastStore: jest.fn().mockReturnValue({
    showToast: jest.fn()
  })
}));

describe('ProjectFormPage', () => {
  beforeEach(() => {
    (useProject as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        projectName: 'Test Project',
        manager: { managerName: 'Test Manager', managerImage: '' },
        resources: '5',
        timeline: { timeStart: '2023-01-01', timeEnd: '2023-12-31' },
        budget: 1000,
        status: 'On Track'
      },
      isQueryProjectDetailPending: false,
      isMutating: false,
      mutate: { addProject: jest.fn(), editProject: jest.fn() }
    });
  });

  it('should render ProjectFormFields and match the snapshot', () => {
    const { asFragment } = render(<ProjectFormPage title='Edit Project' />);

    const projectNameInput = screen.getByLabelText(/Project Name/i);
    expect(projectNameInput).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
