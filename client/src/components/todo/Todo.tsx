import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTodo } from '../../queries/todos';
import { TodoType } from "../../constants/types";

const Todo = () => {

    const params = useParams();
    const { data } = useTodo(params.todoId || '');
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
        setSelectedTodo(data.data);
    }, [data]);

    return(
        <li>
            <h3>{selectedTodo.title}</h3>
            <p>{selectedTodo.content}</p>
            <p>작성일시 : {selectedTodo.createdAt}</p>
            <button>수정</button>
            <button>삭제</button>
        </li>
    );
}
export default Todo;
