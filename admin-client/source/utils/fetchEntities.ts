import Axios from 'axios';
import { ADMIN_KEY, API_URL } from '../config';

export type EntityLike = 'drugs' | 'manufacturers' | 'employees' | 'doctors' | 'customers' | 'suppliers';

interface FetchEntityResult {
  entityData?: any[];
  hasErrors: boolean;
  errors?: Error;
}

export default async function fetchEntity(entity: EntityLike): Promise<FetchEntityResult> {
  try {
    const response = await Axios({
      method: 'GET',
      url: `${API_URL}/api/admin/${entity}/get/all`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
      },
    });

    return {
      entityData: response.data,
      hasErrors: false,
    };
  } catch (err) {
    return {
      hasErrors: true,
      errors: err,
    };
  }
}
