const TodoListItem = ({title, content, created}:{title: any, content: any, created: any}) => {
    return(
        <li>
            <h3>{title}</h3>
            <p>{content}</p>
            <p>작성일시 : {created}</p>
        </li>
    );
}

const TodoList = (list : Array<T>) => {
    return (
        <ul>
            {list.map((item)=> <TodoListItem title={item.title}
                                             content={item.content}
                                             created={item.created}/>)}
        </ul>
    );
}

export default TodoList;
