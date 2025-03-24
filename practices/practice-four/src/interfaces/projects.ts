import { STATUS } from '@/enums/status';

interface IProjectsQueryResult {
  // data: The fetched project data, an array of project items.
  data?: IProjectItemProps[];
  // isFetching: A boolean indicating whether the query is currently in progress.
  isFetching: boolean;
  // isFetched: A boolean indicating whether the query has been completed.
  isFetched: boolean;
  // error:  The error object if the query fails, or null if there's no error.
  error: Error | null;
}

interface IProjectItemProps {
  // id: The unique identifier for the project.
  id: string;
  // projectName: The name of the project.
  projectName: string;
  // status: The current status of the project or string, indicating progress or risk level.
  status: STATUS | string;
  // managerId: The id for managers objects.
  managerId?: number;
  // lastUpdate: The date when the project was last updated.
  lastUpdate: string;
  // resources: Optional resources associated with the project, displayed as tags.
  resources?: string;
  // timeline: Optional timeline object containing start and end times for the project.
  timeline?: ITimelineProps;
  // budget: Optional estimated cost of the project, displayed as a financial estimate.
  budget?: number;
  // manager: The manager object for project details.
  manager?: IManagerProps;
}

interface IManagerProps {
  // id: The unique identifier for the manager.
  id?: string;
  // managerName: The name of the project manager responsible for overseeing the project.
  managerName: string;
  // managerImage: Optional URL for the project manager's avatar image.
  managerImage?: string;
}

interface ITimelineProps {
  // timeStart: Optional start time for the timeline. Defaults to an empty string if not provided.
  timeStart?: string;
  // timeEnd: Optional end time for the timeline. Defaults to an empty string if not provided.
  timeEnd?: string;
}

export type { IProjectsQueryResult, IProjectItemProps, IManagerProps, ITimelineProps };
