import { useEffect, useReducer } from 'react';

const ReducerHookChallenge = () => {
  const URL = '';
  const initialState = {
    data: [],
    loading: false,
    error: null
  };

  const reducer = (action, state) => {
    switch (action.type) {
      case 'FETCH_API_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_API_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_API_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect((): void => {
    const fetchData = async (uri): Promise<void> => {
      dispatch({ type: 'FETCH_API_REQUEST' });

      try {
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error('Error encountered while fetching');
        } else {
          const data = await response.json();
          dispatch({ type: 'FETCH_API_SUCCESS', payload: data });
          console.log(data);
        }
      } catch (error) {
        dispatch({ type: 'FETCH_API_ERROR', data: error });
      }
    };
    fetchData(URL);
  }, []);
};

export default ReducerHookChallenge;
