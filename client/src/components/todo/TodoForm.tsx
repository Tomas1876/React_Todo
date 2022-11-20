import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query'; 
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { createTodo } from '../../apis';
import { useNavigate } from 'react-router';

const TodoForm = () => {

    const [todoTitle, setTodoTitle] = useState('');
    const [todoContent, setTodoContent] = useState('');
    const [isDisabled, setDisabled] = useState(false);

    const navigate = useNavigate();
    
    useEffect(()=>{
        setDisabled(todoTitle !== '' && todoContent !== '')
    }, [todoTitle, todoContent]);

    const onClickCreateTodoButton = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        addTodomutation.mutate({title: todoTitle, content: todoContent});
    }

    const addTodomutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            navigate('/todos');        
        },
    });

    return(
        <form>
            <CustomInput label='할일 제목'
                         name='title'
                         placeholder='제목을 입력하세요'
                         minLength={1}
                         maxLength={100}
                         value={todoTitle}
                         onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value)}/>
            
            <CustomInput label='할일 내용'
                         name='content'
                         placeholder='내용을 입력하세요'
                         minLength={1}
                         maxLength={100}
                         value={todoContent}
                         onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTodoContent(e.target.value)}/>
            
            <CustomButton type='submit'
                          aria-label='등록'
                          disabled={isDisabled}
                          theme={isDisabled ? 'disabled' : 'primary'}
                          onClick={onClickCreateTodoButton} />
        </form>
    );
}
export default TodoForm;
