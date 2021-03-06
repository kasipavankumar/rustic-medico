import axios from 'axios';
import pluralize from 'pluralize';

import { API_URL, ADMIN_KEY } from '../config';

const singularize = (word: string) => pluralize(word, 1);
const buildGetEnpoint = (entityName: string) => `${API_URL}/api/admin/${entityName}/get/all`;
const buildPostEndpoint = (entityName: string) => `${API_URL}/api/admin/${entityName}/add/one`;
const buildUpdateEndpoint = (entityName: string) => `${API_URL}/api/admin/${entityName}/update/one`;
const buildDeleteEndpoint = (entityName: string, id: string) => `${API_URL}/api/admin/${entityName}/delete/one?id=${id}`;

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

  deleteDate = async (data: any): Promise<boolean> => {
    try {
      await axios({
        method: 'DELETE',
        url: buildDeleteEndpoint(this.entityName, data.id),
        headers: buildHeaders(),
      });

      return true;
    } catch (err) {
      return false;
    }
  };

  updateData = async (data: {}): Promise<boolean> => {
    try {
      const localEntityName = this.entityName === 'manufacturers' ? 'drug_manufacturer' : singularize(this.entityName);

      await axios({
        method: 'PUT',
        url: buildUpdateEndpoint(this.entityName),
        headers: buildHeaders(),
        data: {
          [localEntityName]: data,
        },
      });

      return true;
    } catch (err) {
      return false;
    }
  };

  postData = async (data: {}): Promise<boolean> => {
    try {
      const localEntityName = this.entityName === 'manufacturers' ? 'drug_manufacturer' : singularize(this.entityName);

      await axios({
        method: 'POST',
        url: buildPostEndpoint(this.entityName),
        headers: buildHeaders(),
        data: {
          [localEntityName]: data,
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
