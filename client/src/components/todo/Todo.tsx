import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../../queries/todos';
import { TodoType } from "../../constants/types";
import CustomButton from '../common/CustomButton';
import { deleteTodo, updateTodo } from '../../apis';
import CustomInput from '../common/CustomInput';

const TodoItem = ({todo} : {todo: TodoType}) => {

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    const [todoContents, setTodoContents] = useState({
        title: '',
        content: ''
    })
    
    const onClickUpdate = (e : React.MouseEvent<HTMLElement>) => {
        if(!isEditing) {
            setIsEditing(true);
        } else if(!canUpdate) {
            let message = ''
            if(todoContents.title.trim() === '') {
                message = '할일 제목을 1자 이상 입력해주세요.';
            } else if(todoContents.content.trim() === '') {
                message = '할일 제목을 1자 이상 입력해주세요.';
            } else {
                message = '할일을 수정할 수 없습니다. 다시 시도해주세요.'
            }
            alert(message);
        }
    }

    const onSubmitUpdate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if(window.confirm('수정하시겠습니까?')) {
            updateTodo(todo.id, todoContents);
        } else {
            return;
        }
        setIsEditing(false);
        setCanUpdate(false);
    }

    const onSubmitDelete = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        deleteTodo(todo.id);
        navigate(-1);
    }

    useEffect(()=>{
        if(isEditing) {
            const isEmptyTitle = todoContents.title.trim() === '';
            const isEmptyContent = todoContents.content.trim() === '';

            if(!isEmptyTitle && !isEmptyContent) {
                const didUpdateTitle = todoContents.title !== todo.title
                const didUpdateContent =  todoContents.content !== todo.content
                setCanUpdate(didUpdateTitle || didUpdateContent);
            }
        }
    }, [isEditing, canUpdate, todoContents, todo])

    useEffect(()=>{
        setTodoContents(todo);
    },[todo])

    return (
            <>
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
            <p>작성일시 : {todo.createdAt}</p>
            {todo.createdAt !== todo.updatedAt ? 
                                        <p>수정일시 : {todo.updatedAt}</p> : ''}
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
        </>
    );
}


const Todo = () => {

    const params = useParams();
    const { data } = useTodo(params.todoId || null);

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
    }, [data]);
 
    return(
        <>
            {data ? <TodoItem todo={selectedTodo} /> : ''}
        </>
    );
}
export default Todo;
