import { useEffect, useState } from 'react';
import { API_URL } from 'source/config';
import api from 'lib/api';

export default function useSalesData() {
  const initialState = { data: [], hasErrors: false, isLoading: true };
  const [state, setState] = useState(initialState);

  const fetchData = async () => {
    try {
      const URL = `${API_URL}/api/admin/sales`;
      const { data } = await api.get(URL);
      setState({ ...state, isLoading: false, data });
    } catch (err) {
      setState({ ...state, hasErrors: true, isLoading: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data: state.data['salesData'],
    hasErrors: state.hasErrors,
    isLoading: state.isLoading,
  };
}
