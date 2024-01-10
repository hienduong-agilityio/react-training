import MESSAGES from '../constants/messages';

/**
 * Fetches data from the server based on the provided API URL.
 * @param {string} apiUrl - The URL of the API endpoint.
 * @returns {Promise<T>} A promise resolving to the requested data.
 */
async function getData<T>(apiUrl: string): Promise<T> {
  try {
    const response: Response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });

    if (!response.ok) {
      const errorMessage = `HTTP Error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data: T = await response.json();

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(MESSAGES.FETCH_ERROR_MESSAGE + error);

    throw error;
  }
}

export default getData;
