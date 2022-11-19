import { useNavigate, useParams } from 'react-router-dom';
import { TodoType } from "../../constants/types";

const Todo = ( {todo} : {todo: TodoType} ) => {

    return(
        <li>
            <h3>{todo.title}</h3>
            <p>{todo.content}</p>
            <p>작성일시 : {todo.createdAt}</p>
            <button>수정</button>
            <button>삭제</button>
        </li>
    );
}
export default Todo;
