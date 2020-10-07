import { useEffect, useState } from 'react';

import api from 'lib/api';

/**
 * Hook to fetch entity data from API.
 *
 * @param entityName
 */
const useEntityData = (entityName: string) => {
  const [entityData, setEntityData] = useState<any[] | null>(null);
  const [hasErrors, setErrors] = useState<boolean>(false);

  const fetchEntityData = async () => {
    try {
      const { data } = await api.get(`/api/admin/${entityName}/get/all`);
      setEntityData(data[entityName]);
    } catch (err) {
      setErrors(true);
      setEntityData(null);
    }
  };

  useEffect(() => {
    fetchEntityData();
  }, []);

  return {
    isLoading: !entityData && !hasErrors,
    hasErrors,
    entityData,
  };
};

export default useEntityData;
