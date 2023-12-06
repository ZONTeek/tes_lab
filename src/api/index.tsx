import axios from 'axios';
import Config from 'react-native-config';
import {Person} from '../types';

const api = axios.create({
  baseURL: Config.API_URL,
});

const getPeople = async (
  page: number,
): Promise<{data: {results: Person[]}}> => {
  return await api.get(`people/?page=${page}`);
};

export {getPeople};
