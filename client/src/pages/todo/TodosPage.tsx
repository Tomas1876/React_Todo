import { useNavigate } from 'react-router-dom';
import { useTodos, useTodo } from '../../queries/todos';
import { Main } from '../../style/common';
import Todo from '../../components/todo/Todo';
import TodoList from '../../components/todo/TodoList';
// import Todo from '../../components';

const TodosPage = () => {
    
    const navigate = useNavigate();
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
                <TodoList />
            </article>
            <article>
                <Todo />
            </article>
        </Main>
    );
}

export default TodosPage;
