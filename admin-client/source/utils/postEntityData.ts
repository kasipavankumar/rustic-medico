import axios from 'axios';
import { ADMIN_KEY, API_URL } from '../config';
import { EntityLike } from './fetchEntities';

interface IPostEntityDataResponse {
    hasErrors: boolean;
    error?: Error | string;
    response?: any;
    status?: number;
}

export default async function postEntityData(entity: EntityLike, data: any): Promise<IPostEntityDataResponse> {
    try {
        console.log(data);

        const response = await axios({
            method: 'POST',
            url: `${API_URL}/api/admin/${entity}/add/one`,
            headers: {
                'Content-Type': 'application/json',
                'Admin-Key': ADMIN_KEY,
            },
            data,
        });

        if (response.status !== 200) {
            return {
                hasErrors: true,
                error: response.statusText,
                status: response.status,
            };
        }

        return {
            hasErrors: false,
            status: response.status,
            response,
        };
    } catch (err) {
        console.error(err);
        return {
            hasErrors: true,
            error: err,
        };
    }
}
