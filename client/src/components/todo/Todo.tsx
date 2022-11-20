import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../../queries/todos';
import { TodoType } from "../../constants/types";
import CustomButton from '../common/CustomButton';
import { deleteTodo, updateTodo } from '../../apis';
import CustomInput from '../common/CustomInput';

const Todo = () => {

    const navigate = useNavigate();

    const params = useParams();
    const { data } = useTodo(params.todoId || '');
    const [isEditing, setIsEditing] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    const [todoContents, setTodoContents] = useState({
        title: '',
        content: ''
    })
    
    const [selectedTodo, setSelectedTodo] = useState<TodoType>({
        id: '',
        title: '',
        content: '',
        createdAt: '',
        updatedAt: ''
    });

    useEffect(() => {
        if(!data) {
            return;
        }
        const todo = data.data; 
        setSelectedTodo(todo);
        setTodoContents({
            title: todo.title,
            content: todo.content
        })
    }, [data]);

    /* FIXME 한 가지 함수가 너무 많은 일을 하고 있지 않나?!*/
    const onClickUpdate = (e : React.MouseEvent<HTMLElement>) => {
        if(!isEditing) {
            setIsEditing(true);
        }
    }

    const onSubmitUpdate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        updateTodo(selectedTodo.id, todoContents);
        setIsEditing(false);
        setCanUpdate(false);
    }

    const onSubmitDelete = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        deleteTodo(selectedTodo.id);
        navigate(-1);
    }

    useEffect(()=>{
        if(isEditing) {
            const isEmptyTitle = todoContents.title.trim() === '';
            const isEmptyContent = todoContents.content.trim() === '';

            if(!isEmptyTitle && !isEmptyContent) {
                const didUpdateTitle = todoContents.title !== selectedTodo.title
                const didUpdateContent =  todoContents.content !== selectedTodo.content
                setCanUpdate(didUpdateTitle || didUpdateContent);
            }
        }
    }, [isEditing, canUpdate, todoContents, selectedTodo])

    return(
        <li>
            <CustomInput label='할일 제목'
                         name='title'
                         placeholder='제목을 입력하세요'
                         minLength={1}
                         maxLength={100}
                         value={todoContents.title}
                         readOnly={!isEditing}
                         onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
                                                setTodoContents({
                                                    title: e.target.value,
                                                    content: todoContents.content})}/>
            
            <CustomInput label='할일 내용'
                         name='content'
                         placeholder='내용을 입력하세요'
                         minLength={1}
                         maxLength={100}
                         value={todoContents.content}
                         readOnly={!isEditing}
                         onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
                                                setTodoContents({
                                                    title: todoContents.title,
                                                    content: e.target.value})}/>
            <p>작성일시 : {selectedTodo.createdAt}</p>
            {selectedTodo.createdAt !== selectedTodo.updatedAt ? 
                                        <p>수정일시 : {selectedTodo.updatedAt}</p> : ''}
            <CustomButton type='submit'
                          aria-label='수정'
                          width='50px'
                          height='30px'
                          font-size='16px'
                          theme={canUpdate ? 'primary' : 'secondary'}
                          onClick={isEditing && canUpdate ? onSubmitUpdate : onClickUpdate} />
            <CustomButton type='submit'
                          aria-label='삭제'
                          width='50px'
                          height='30px'
                          font-size='16px'
                          theme='primary'
                          onClick={onSubmitDelete} />
        </li>
    );
}
export default Todo;
