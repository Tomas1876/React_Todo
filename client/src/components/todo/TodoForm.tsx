import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query'; 
import CustomInput from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import { createTodo } from '../../apis';

const TodoForm = (onSubmit : Function) => {

    const [todoTitle, setTodoTitle] = useState('');
    const [todoContent, setTodoContent] = useState('');
    const [isDisabled, setDisabled] = useState(false);

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

    const CreateTodoButton = () => CustomButton(
                       "submit",
                       "등록",
                        isDisabled,
                        !isDisabled ? 'primary' : 'disabled',
                        onClickCreateTodoButton)

    useEffect(()=>{
        setDisabled(todoTitle !== '' && todoContent !== '')
    }, [todoTitle, todoContent]);

    const onClickCreateTodoButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        addTodomutation.mutate({title: todoTitle, content: todoContent});
    }

    const addTodomutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            setTodoTitle('');
            setTodoContent('');        
        },
    });

    return(
        <form>
            {TodoTitle()}
            {TodoContent()}
            {CreateTodoButton()}
        </form>
    );
}
export default TodoForm;
