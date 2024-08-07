/* eslint-disable react-refresh/only-export-components */

// Types
import type { IProjectItemProps } from '@/components/common/ProjectItem';

// Libraries
import { createContext, useContext, useMemo, ReactNode, useReducer, Dispatch, Reducer } from 'react';

// Constants
import { DISPATCH_ACTION } from '@/constants/store';

export type ProjectType = {
  // data: This array can be filtered based on search input or other criteria.
  data: IProjectItemProps[];
  // originalData: The unmodified original set of project items.
  originalData: IProjectItemProps[];
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
  // Action to Search Project by name
  | { type: typeof DISPATCH_ACTION.SEARCH_PROJECT_BY_NAME; inputValue: string }

  // Action to Mocking Project Data
  | { type: typeof DISPATCH_ACTION.MOCKING_PROJECTS_ITEM; payload: IProjectItemProps[] };

const initialState: ProjectType = {
  data: [],
  originalData: []
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
    // Search project by input value
    case DISPATCH_ACTION.SEARCH_PROJECT_BY_NAME: {
      if (action.inputValue === '') {
        return {
          ...state,
          data: state.originalData
        };
      }

      // Func to filter original data with input value
      const filteredData = state.originalData.filter((project) =>
        project.projectName.toLowerCase().includes(action.inputValue.toLowerCase())
      );

      return {
        ...state,
        data: filteredData
      };
    }

    // Mocking data
    case DISPATCH_ACTION.MOCKING_PROJECTS_ITEM:
      return {
        ...state,
        data: action.payload,
        originalData: action.payload
      };

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
