import axios from 'axios';
import pluralize from 'pluralize';

import { API_URL, ADMIN_KEY } from '../config';

const singularize = (word: string) => pluralize(word, 1);
const buildGetEnpoint = (entityName: string) => `${API_URL}/api/admin/${entityName}/get/all`;
const buildPostEndpoint = (entityName: string) => `${API_URL}/api/admin/${entityName}/add/one`;
const buildHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Admin-Key': ADMIN_KEY,
});

class NetworkService {
  private readonly entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  postData = async (data: {}): Promise<boolean> => {
    try {
      await axios({
        method: 'POST',
        url: buildPostEndpoint(this.entityName),
        headers: buildHeaders(),
        data: {
          [singularize(this.entityName)]: data,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  };

  fetchData = async (): Promise<boolean | any[]> => {
    try {
      const response = await axios({
        method: 'GET',
        url: buildGetEnpoint(this.entityName),
        headers: buildHeaders(),
      });

      // TODO: Change this hack
      const extractEntityName = this.entityName === 'manufacturers' ? 'drug_manufacturers' : this.entityName;

      return response.data[extractEntityName];
    } catch (err) {
      return false;
    }
  };
}

export default NetworkService;
