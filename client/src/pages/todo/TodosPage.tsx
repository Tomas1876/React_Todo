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

    const [selectedTodo, setSelectedTodo] = useState<TodoType>();

    const [todos, setTodos] = useState(Array<TodoType>);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoContent, setTodoContent] = useState('');
    const [canCreateTodo, setCanCreateTodo] = useState(false);

    const { data } = useTodos();
    console.log(data);
    if(!localStorage.getItem('userToken')) {
        if(window.confirm('로그인 정보가 만료되었습니다.')) {
            navigate('/auth/login');
        }
    }

    const TodoTitle = () => CustomInput(
                        'text',
                        '할일 제목',
                        'title',
                        '제목을 입력하세요',
                        0,
                        100,
                        todoTitle,
                        (e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value)
                    );
    const TodoContent = () => CustomInput(
                        'text',
                        '내용',
                        'content',
                        '내용을 입력하세요',
                        0,
                        100,
                        todoContent,
                        (e: React.ChangeEvent<HTMLInputElement>) => setTodoContent(e.target.value)
                    );

    const onClickCreateTodoButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        addTodomutation.mutate({title: todoTitle, content: todoContent});
    }
    
    const CreateTodoButton = () => CustomButton(
                       "submit",
                       "등록",
                        !canCreateTodo,
                        canCreateTodo ? 'primary' : 'disabled',
                        onClickCreateTodoButton)

    useEffect(()=>{
        setCanCreateTodo(todoTitle !== '' && todoContent !== '')
    }, [todoTitle, todoContent]);
    const addTodomutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (response) => {
        // Invalidate and refetch
        /* FIXME 왜 안 되지??? refetch가 제대로 안 되는 것 같다 */
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        setTodoTitle('');
        setTodoContent('');        
    },
  })
  
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
            <form>
                {TodoTitle()}
                {TodoContent()}
                {CreateTodoButton()}
            </form>
            <article>
                {data? data.data.map((todo : TodoType)=> <TodoListItem key={todo.id} todo={todo} />) : ''}
            </article>
            <article>
                
            </article>
        </Main>
    );
}

export default TodosPage;
