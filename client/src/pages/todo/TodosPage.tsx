import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DEFAULT_URL } from '../../constants/global';
import { Main } from '../../style/common';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
// import Todo from '../../components';

const Todo = ({title, content, created}:{title: any, content: any, created: any}) => {
    return(
        <li>
            <h3>{title}</h3>
            <p>{content}</p>
            <p>작성일시 : {created}</p>
        </li>
    );
}

interface todoType {
    id: any;
    title: any;
    content: any;
    createdAt: any;
}

const TodosPage = () => {
    
    const navigate = useNavigate();

    if(!localStorage.getItem('userToken')) {
        if(window.confirm('로그인 정보가 만료되었습니다.')) {
            navigate('/auth/login');
        }
    }

    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoContent, setTodoContent] = useState('');
    const [canCreateTodo, setCanCreateTodo] = useState(false);

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
    const getTodos = () => {
        axios.get(`${DEFAULT_URL}/todos`,
                    {headers: {
                            Authorization: localStorage.getItem('userToken') || ''
                        }
                    })
                    .then(
                        (response)=>{
                            console.log(response.data.data);
                            setTodos(response.data.data);
                            console.log(todos);
                        }
                    )
    }

    const createTodo = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('보내기 전에 ')
        axios.post(`${DEFAULT_URL}/todos`,
                    {
                        title: todoTitle,
                        content: todoContent
                    },
                    {headers: {
                            Authorization: localStorage.getItem('userToken') || ''
                        }
                    })
                    .then(
                        (response)=>{
                            console.log(response);
                            setTodos(todos.concat(response.data.data));
                        }
                    )
    }
    const CreateTodoButton = () => CustomButton(
                       "submit",
                       "등록",
                        !canCreateTodo,
                        canCreateTodo ? 'primary' : 'disabled',
                        createTodo)

    useEffect(()=>{
        setCanCreateTodo(todoTitle !== '' && todoContent !== '')
    }, [todoTitle, todoContent]);

    useEffect(()=>{
        getTodos();
    }, [todos]);   
    return(
        <Main>
            <h2>할일 목록</h2>
            <form>
                {TodoTitle()}
                {TodoContent()}
                {CreateTodoButton()}
            </form>
            {todos.length === 0 ? <ul></ul> : 
                                <ul>
                                    {todos.map(
                                        (todo)=> <Todo key={todo['id']}
                                                       title={todo['title']}
                                                       content={todo['content']}
                                                       created={todo['createdAt']}/>
                                        )
                                    }
                                </ul>}
        </Main>
    );
}

export default TodosPage;