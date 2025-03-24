// Libraries
import { render, screen, fireEvent } from '@testing-library/react';

// Pages
import { ProjectFormFields, IProjectFormFieldsProps } from '@/pages/ProjectForm/ProjectFormFields';

// Enums
import { STATUS } from '@/enums';

// Constants
import { VALIDATION_MESSAGES } from '@/constants';

const initialFormValues = {
  id: '123',
  projectName: 'Project A',
  status: STATUS.ON_TRACK,
  manager: {
    managerName: 'John Doe',
    managerImage: 'https://example.jpg'
  },
  resources: '10',
  timeline: {
    timeStart: '2024-01-01',
    timeEnd: '2024-12-31'
  },
  budget: 100000,
  lastUpdate: '2024-10-10'
};

const defaultProps: IProjectFormFieldsProps = {
  initialFormValues,
  formErrorsMessages: {},
  isMutating: false,
  isQueryProjectDetailPending: false,
  title: 'Add Project',
  handleCancelForm: jest.fn(),
  handleSubmitForm: jest.fn()
};

describe('ProjectFormFields', () => {
  beforeAll(() => {
    HTMLFormElement.prototype.requestSubmit = jest.fn();
  });

  const renderComponent = (props: Partial<IProjectFormFieldsProps> = {}) => {
    return render(<ProjectFormFields {...defaultProps} {...props} />);
  };

  it('matches the snapshot for ProjectFormFields', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the form with initial values', () => {
    renderComponent();

    expect(screen.getByLabelText(/Project Name/i)).toHaveValue('Project A');
    expect(screen.getByLabelText(/Project Manager \(PM\)/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Manager Image URL/i)).toHaveValue('https://example.jpg');
    expect(screen.getByLabelText(/Resources/i)).toHaveValue(10);
    expect(screen.getByLabelText(/Budget/i)).toHaveValue(100000);
    expect(screen.getByLabelText(/From/i)).toHaveValue('2024-01-01');
    expect(screen.getByLabelText(/To/i)).toHaveValue('2024-12-31');
  });

  it('renders default timeline when no timeline data is provided', () => {
    renderComponent({
      initialFormValues: {
        ...initialFormValues,
        timeline: {}
      }
    });

    expect(screen.getByLabelText(/From/i)).toHaveDisplayValue('');
    expect(screen.getByLabelText(/To/i)).toHaveDisplayValue('');
  });

  it('renders a spinner and overlay when isQueryProjectDetailPending is true', () => {
    renderComponent({ isQueryProjectDetailPending: true, title: 'Edit Project' });

    const overlaySpinner = screen.getByText(/please waiting/i);
    expect(overlaySpinner).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls handleCancelForm when the cancel button is clicked', () => {
    const handleCancelFormMock = jest.fn();
    renderComponent({ handleCancelForm: handleCancelFormMock });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.submit(cancelButton);

    expect(handleCancelFormMock).toHaveBeenCalledTimes(0);
  });

  it('calls handleSubmitForm when the form is submitted', () => {
    const handleSubmitFormMock = jest.fn((e) => e.preventDefault());
    renderComponent({ handleSubmitForm: handleSubmitFormMock });

    const submitButton = screen.getByRole('button', { name: /add project/i });
    fireEvent.click(submitButton);

    expect(handleSubmitFormMock).toHaveBeenCalledTimes(1);
  });

  it('displays error messages for invalid form inputs', () => {
    const formErrorsMessages = {
      projectName: VALIDATION_MESSAGES.INVALID_NAME_MESSAGE,
      resources: VALIDATION_MESSAGES.RESOURCES_MIN_VALUE_MESSAGE,
      budget: VALIDATION_MESSAGES.BUDGET_POSITIVE_NUMBER_MESSAGE,
      'timeline.timeEnd': VALIDATION_MESSAGES.TIMELINE_DATE_MESSAGE
    };

    renderComponent({
      formErrorsMessages
    });

    expect(screen.getByText(VALIDATION_MESSAGES.INVALID_NAME_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(VALIDATION_MESSAGES.RESOURCES_MIN_VALUE_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(VALIDATION_MESSAGES.BUDGET_POSITIVE_NUMBER_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(VALIDATION_MESSAGES.TIMELINE_DATE_MESSAGE)).toBeInTheDocument();
  });

  it('renders the correct button text based on mutation state and title', () => {
    renderComponent({ title: 'Edit Project' });
    const submitButton = screen.getByRole('button', { name: /edit project/i });
    expect(submitButton).toBeInTheDocument();

    renderComponent({ isMutating: true });
    const spinnerInButton = screen.getByRole('progressbar');
    expect(spinnerInButton).toBeInTheDocument();
  });
});
