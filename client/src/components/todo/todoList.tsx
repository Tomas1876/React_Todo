
import { TodoType } from "../../constants/types";

const TodoListItem = ({ todo } : { todo: TodoType }) => {
    return(
        <li>
            <h3>{todo.title}</h3>
            <p>작성일시 : {todo.createdAt}</p>
        </li>
    );
}

export default TodoListItem;
