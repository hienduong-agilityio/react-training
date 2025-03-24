// Services
import { apiRequest } from '@/services';

// Constants
import { HTTP_METHODS } from '@/constants';

// Interfaces
import { IProjectItemProps } from '@/interfaces';

// Enums
import { STATUS } from '@/enums';

global.fetch = jest.fn();

describe('apiRequest', () => {
  const mockFetch = fetch as jest.Mock;

  const mockSuccessfulFetch = (mockResponse: IProjectItemProps) => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });
  };

  const mockFailedFetch = (mockErrorResponse: { error: { message: string } }) => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => mockErrorResponse
    });
  };

  let requestOptions: {
    url: string;
    method: string;
    headers: Record<string, string>;
    data?: IProjectItemProps;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    requestOptions = {
      url: '',
      method: '',
      headers: { 'Content-Type': 'application/json' }
    };
  });

  it('should make a GET request and return the result', async () => {
    const mockResponse: IProjectItemProps = {
      id: '1',
      projectName: 'Project A',
      manager: { managerName: '' },
      lastUpdate: '',
      status: STATUS.ON_HOLD
    };
    mockSuccessfulFetch(mockResponse);

    requestOptions.url = '/api/projects';
    requestOptions.method = HTTP_METHODS.GET;

    const result = await apiRequest(requestOptions);

    expect(mockFetch).toHaveBeenCalledWith(requestOptions.url, {
      method: requestOptions.method,
      headers: requestOptions.headers
    });
    expect(result).toEqual(mockResponse);
  });

  it('should make a POST request and send data correctly', async () => {
    const mockResponse: IProjectItemProps = {
      id: '1',
      projectName: 'New Project',
      manager: { managerName: 'John Doe' },
      lastUpdate: '2023-10-10',
      status: STATUS.ON_HOLD
    };
    const requestData: IProjectItemProps = {
      id: '1',
      projectName: 'New Project',
      manager: { managerName: 'John Doe' },
      lastUpdate: '2023-10-10',
      status: STATUS.ON_HOLD
    };

    mockSuccessfulFetch(mockResponse);

    requestOptions.url = '/api/projects';
    requestOptions.method = HTTP_METHODS.POST;
    requestOptions.data = requestData;

    const result = await apiRequest(requestOptions);

    expect(mockFetch).toHaveBeenCalledWith(requestOptions.url, {
      method: requestOptions.method,
      headers: requestOptions.headers,
      body: JSON.stringify(requestOptions.data)
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error when the response is not ok', async () => {
    const mockErrorResponse = { error: { message: 'Failed to fetch' } };
    mockFailedFetch(mockErrorResponse);

    requestOptions.url = '/api/projects';
    requestOptions.method = HTTP_METHODS.GET;

    await expect(apiRequest(requestOptions)).rejects.toThrow('Failed to fetch');
    expect(mockFetch).toHaveBeenCalledWith(requestOptions.url, {
      method: requestOptions.method,
      headers: requestOptions.headers
    });
  });

  it('should handle errors when there is no message in the error response', async () => {
    mockFailedFetch({ error: { message: '' } });

    requestOptions.url = '/api/projects';
    requestOptions.method = HTTP_METHODS.GET;

    await expect(apiRequest(requestOptions)).rejects.toThrow();
    expect(mockFetch).toHaveBeenCalledWith(requestOptions.url, {
      method: requestOptions.method,
      headers: requestOptions.headers
    });
  });
});
