import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos, useTodo } from '../../queries/todos';
import { Main } from '../../style/common';
import { TodoType } from '../../constants/types';
import Todo from '../../components/todo/Todo';
import TodoListItem from '../../components/todo/TodoList';
import { NavLink } from 'react-router-dom';
// import Todo from '../../components';

const TodosPage = () => {
    
    const navigate = useNavigate();

    const [todos, setTodos] = useState(Array<TodoType>);

    

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
                {data? data.data.map((todo : TodoType)=>
                     <NavLink to={todo.id}><TodoListItem key={todo.id} todo={todo} /></NavLink>)
                     : ''}
            </article>
            <article>
                <Todo />
            </article>
        </Main>
    );
}

export default TodosPage;
