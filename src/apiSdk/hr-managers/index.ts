import axios from 'axios';
import queryString from 'query-string';
import { HrManagerInterface, HrManagerGetQueryInterface } from 'interfaces/hr-manager';
import { GetQueryInterface } from '../../interfaces';

export const getHrManagers = async (query?: HrManagerGetQueryInterface) => {
  const response = await axios.get(`/api/hr-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createHrManager = async (hrManager: HrManagerInterface) => {
  const response = await axios.post('/api/hr-managers', hrManager);
  return response.data;
};

export const updateHrManagerById = async (id: string, hrManager: HrManagerInterface) => {
  const response = await axios.put(`/api/hr-managers/${id}`, hrManager);
  return response.data;
};

export const getHrManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/hr-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHrManagerById = async (id: string) => {
  const response = await axios.delete(`/api/hr-managers/${id}`);
  return response.data;
};
