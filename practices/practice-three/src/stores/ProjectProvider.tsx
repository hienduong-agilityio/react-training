/* eslint-disable react-refresh/only-export-components */

// Types
import type { IProjectItemProps } from '@/components/ProjectItem';

// Libraries
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch, Reducer } from 'react';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

// Helpers
import { filterProjectsByField } from '@/helper/projectHelpers';

export type ProjectType = {
  // data: This array can be filtered based on search input or other criteria.
  data: IProjectItemProps[];
  // originalData: The unmodified original set of project items.
  originalData: IProjectItemProps[];
  // filterKeyword: The search input value
  filterKeyword: string;
  // searchField: The field used for searching
  searchField: keyof IProjectItemProps;
  // selectedProjectId: Selected project id
  selectedProjectId: string;
};

interface IProjectContextProps {
  // state: Current state of the Project context
  state: ProjectType;
  // dispatch: A dispatch function used to send actions to the reducer.
  dispatch: Dispatch<Action>;
}

interface IContextProviderProps {
  // children: The components that will have access to the context.
  children: ReactNode;
}

// Action dispatched type
type Action =
  // Action to Search Project by filed
  | { type: typeof DISPATCH_ACTION.SEARCH_PROJECT_BY_FIELD; inputValue: string; selectField: keyof IProjectItemProps }

  // Action to Mocking Project Data
  | { type: typeof DISPATCH_ACTION.MOCKING_PROJECTS_ITEM; payload: IProjectItemProps[] }

  // Action to Add Project Item
  | { type: typeof DISPATCH_ACTION.ADD_PROJECT_ITEM; payload: IProjectItemProps }

  // Action to Update Project Item
  | { type: typeof DISPATCH_ACTION.UPDATE_PROJECT_ITEM; payload: IProjectItemProps }

  // Action to selected project id
  | { type: typeof DISPATCH_ACTION.SET_SELECTED_PROJECT; payload: string }

  // Action to clear init project id
  | { type: typeof DISPATCH_ACTION.CLEAR_SELECTED_PROJECT };

const initialState: ProjectType = {
  data: [],
  originalData: [],
  filterKeyword: '',
  searchField: 'projectName',
  selectedProjectId: ''
};

/**
 * Reducer function to update Project context state with types
 *
 * @param state - Current state of the Project context
 * @param action - Action dispatched to update state
 *
 * @returns Updated state based on the dispatched action
 */
const projectReducer = (state: ProjectType, action: Action) => {
  switch (action.type) {
    // Search project by field
    case DISPATCH_ACTION.SEARCH_PROJECT_BY_FIELD: {
      return {
        ...state,
        data: filterProjectsByField(state.originalData, action.inputValue, action.selectField),
        filterKeyword: action.inputValue,
        searchField: action.selectField
      };
    }

    case DISPATCH_ACTION.SET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload
      };

    case DISPATCH_ACTION.CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        selectedProjectId: ''
      };

    // Mocking data
    case DISPATCH_ACTION.MOCKING_PROJECTS_ITEM:
      return {
        ...state,
        data: action.payload,
        originalData: action.payload
      };

    // Add new project item
    case DISPATCH_ACTION.ADD_PROJECT_ITEM: {
      const updatedOriginalData = [action.payload, ...state.originalData];

      return {
        ...state,
        originalData: updatedOriginalData,
        data: filterProjectsByField(updatedOriginalData, state.filterKeyword, state.searchField)
      };
    }

    // Updated project item
    case DISPATCH_ACTION.UPDATE_PROJECT_ITEM: {
      const updatedOriginalData = state.originalData.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );

      return {
        ...state,
        originalData: updatedOriginalData,
        data: filterProjectsByField(updatedOriginalData, state.filterKeyword, state.searchField)
      };
    }

    default:
      return state;
  }
};

// Create context
export const ProjectContext = createContext<IProjectContextProps>({ state: initialState, dispatch: () => {} });

/**
 * Custom hook to access the ProjectContext for access to the state and dispatch function
 *
 * @throws Error if used outside of a ProjectProvider.
 */
export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }

  return context;
};

/**
 * Context provider component for ProjectContext.
 *
 * @returns A provider component that wraps its children with the project context.
 */
export const ProjectProvider = ({ children }: IContextProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<ProjectType, Action>>(projectReducer, initialState);

  const contextValue: IProjectContextProps = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  );

  return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
};
