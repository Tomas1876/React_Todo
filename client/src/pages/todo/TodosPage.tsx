import {
  useQuery,
  useMutation,
  QueryClient,
} from '@tanstack/react-query'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    const getTodos = async (): Promise<TodoType[]> => { 
                const data = await axios.get(`${DEFAULT_URL}/todos`,
                    {headers: {
                            Authorization: localStorage.getItem('userToken') || ''
                        }
                    });
                setTodos(data.data.data);
                return data.data.data};
    const createTodo = async () : Promise<TodoType> => {    
                const data = await axios.post(`${DEFAULT_URL}/todos`,
                    {
                        title: todoTitle,
                        content: todoContent
                    },
                    {headers: {
                            Authorization: localStorage.getItem('userToken') || ''
                        }
                    });
                return data.data.data;
            };

    const onClickCreateTodoButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        mutation.mutate();
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
    
    /* TODO 상태관리를 하게 되면  react-query 관련 코드는 분리할 것 */
    const { data } = useQuery({ queryKey: ['todos'], queryFn: getTodos })
   
    const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (response) => {
        // Invalidate and refetch
        /* FIXME 왜 안 되지??? refetch가 제대로 안 되는 것 같다 */
        //queryClient.invalidateQueries({ queryKey: ['todos'] });
        getTodos();        
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
                {todos? todos.map((todo : TodoType)=> <TodoListItem key={todo.id} todo={todo} />) : ''}
            </article>
            <article>
                
            </article>
        </Main>
    );
}

export default TodosPage;
