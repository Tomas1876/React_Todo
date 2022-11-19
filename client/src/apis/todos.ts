import axios, { AxiosError } from 'axios';
import { TodoType } from '../constants/types';
import { DEFAULT_URL } from './../constants/global';

const todoApi = axios.create({
  baseURL: `${DEFAULT_URL}/todos`,
  headers: {
    Authorization: localStorage.getItem('userToken'),
  },
});

export const getTodos = async () => {
    try {
        const { data } = await todoApi.get('');
        return data;
    } catch(error) {
        if (error instanceof AxiosError) {
            console.log(new Error(error.response?.statusText));
        } else {
            console.log(error);
        }
    }
}

export const getTodo = async (id: string) => {
    try {
        const { data } = await todoApi.get(id);
        console.log(data);
        return data;
    } catch(error) {
        if (error instanceof AxiosError) {
            console.log(new Error(error.response?.statusText));
        } else {
            console.log(error);
        }
    }
}

export const createTodo = async (params : Pick<TodoType, 'title' | 'content'>) => {

    try {
        const { data } = await todoApi.post('', params);
        return data;
    } catch(error) {
        if (error instanceof AxiosError) {
            console.log(new Error(error.response?.statusText));
        } else {
            console.log(error);
        }
    }
}
