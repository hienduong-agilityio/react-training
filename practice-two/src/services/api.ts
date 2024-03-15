import { METHOD } from '@constants/api';

/**
 * The function post data
 *
 * @param url - The API
 * @param dataField - The value input
 */
const postData = async <T>(url: string, dataField: T) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(url, {
      method: METHOD.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataField)
    });

    if (!response.ok) {
      const message: string = await response.text();
      throw message;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * The function put data
 *
 * @param url - The API
 * @param dataField - The value input
 */
const putData = async <T>(url: string, dataField: T) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(url, {
      method: METHOD.PUT,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataField)
    });

    if (!response.ok) {
      const message: string = await response.text();
      throw message;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export { postData, putData };
