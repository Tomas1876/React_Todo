import { useQuery } from '@tanstack/react-query'
import { getTodos, getTodo } from "../apis"

export const useTodos = () => {
    return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
}

export const useTodo = (todoId: string | null) => {
  return useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => todoId ? getTodo(todoId) : null
  });
};

