import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL, ADMIN_KEY, ENTITIES } from 'common/constants';

function request(options: { entity: string }): Promise<AxiosResponse> {
  let url: string = `${API_URL}/${ENTITIES.get(options.entity.toUpperCase())}`;

  const axiosOptions: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Admin-Key': ADMIN_KEY,
    },
    url,
  };

  return axios(axiosOptions).then(handleErrors);
}

function handleErrors(response: AxiosResponse) {
  if (response.status !== 200) throw Error(response.statusText);
  return response;
}

export default request;
