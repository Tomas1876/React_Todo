import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main } from '../../style/common';
import Todo from '../../components/todo/Todo';
import TodoList from '../../components/todo/TodoList';
import CustomButton from '../../components/common/CustomButton';
import TodoForm from '../../components/todo/TodoForm';
// import Todo from '../../components';

const TodosPage = () => {
    
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    if(!localStorage.getItem('userToken')) {
        if(window.confirm('로그인 정보가 만료되었습니다.')) {
            navigate('/auth/login');
        }
    }
  
    return(
        <Main className="todo-main">
            <section className="todo-page-header">
                <h2>할일 목록</h2>
                <CustomButton aria-label='새 할일'
                              width='70px'
                              height='30px'
                              font-size='16px'
                              theme='primary'
                              onClick={()=> setIsCreating(true)} />
            </section>
            <section>
                <article>
                    <TodoList />
                </article>
                <article>
                    {isCreating ? <TodoForm /> : <Todo /> }
                </article>
            </section>
        </Main>
    );
}

export default TodosPage;
