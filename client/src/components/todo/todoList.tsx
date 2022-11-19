
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TodoType } from "../../constants/types";
import { useTodosPagable } from "../../hooks/todos";

const TodoListItem = ( { todo } : { todo : TodoType } ) => {
    return (
        <li>
            <h3>{todo.title}</h3>
            <p>작성일시 : {todo.createdAt}</p>
        </li>
    );
}
const TodoList = () => {
    const [page, setPage] = useState(0);
    //const [data, setData] = useState(useTodosPagable(page));
    const data = useTodosPagable(page);

    const generatePageButtons = (pages : number) => {
        const buttons = [];
        for(let i = 0; i < pages; i++) {
            buttons.push(<li>
                            <button key={i}
                                    type="button" 
                                    value={`${i}`} 
                                    name="page-button"
                                    onClick={onChangePage}>{i + 1}</button>
                        </li>);
        }
        return buttons;
    }
    const onChangePage = (event : React.MouseEvent<HTMLElement>) => {
        const pageNumber = event.currentTarget.getAttribute('value');
        console.log(pageNumber);
        setPage(Number(pageNumber));
    }

    return (
        <nav>
            <ul>
                {data? data.items.map((todo : TodoType)=>
                     <NavLink key={`nav-${todo.id}`} to={todo.id}>
                        <TodoListItem key={`item-${todo.id}`} todo={todo} />
                     </NavLink>)
                     : ''}
            </ul>
            <ul>
                {data? generatePageButtons(data.pages) : ''}
            </ul>
        </nav>
    );
}

export default TodoList;
