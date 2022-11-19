import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos, useTodo } from '../../queries/todos';
import { createTodo } from '../../apis';
import { DEFAULT_URL } from '../../constants/global';
import { Main } from '../../style/common';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { TodoType } from '../../constants/types';
import Todo from '../../components/todo/Todo';
import TodoListItem from '../../components/todo/TodoList';
// import Todo from '../../components';

const TodosPage = () => {
    
    const navigate = useNavigate();
    const queryClient = new QueryClient();

    const [todos, setTodos] = useState(Array<TodoType>);

    const [canCreateTodo, setCanCreateTodo] = useState(false);

    const { data } = useTodos();
    console.log(data);
    if(!localStorage.getItem('userToken')) {
        if(window.confirm('로그인 정보가 만료되었습니다.')) {
            navigate('/auth/login');
        }
    }
  
    /*
    // Mutations
    const mutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })
    */
    return(
        <Main>
            <h2>할일 목록</h2>
            <article>
                {data? data.data.map((todo : TodoType)=> <TodoListItem key={todo.id} todo={todo} />) : ''}
            </article>
            <article>
                
            </article>
        </Main>
    );
}

export default TodosPage;
