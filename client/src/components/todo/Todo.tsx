
/*
const Todo = ({title, content, createdAt, updatedAt }:{title: any, content: any, createdAt: any, updatedAt: any}) => {
    return(
        <li>
            <h3>{title}</h3>
            <p>{content}</p>
            <p>작성일시 : {createdAt}</p>
            <button>수정</button>
            <button>삭제</button>
        </li>
    );
}*/
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
