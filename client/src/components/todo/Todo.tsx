
const Todo = ({title, content, created}:{title: any, content: any, created: any}) => {
    return(
        <li>
            <h3>{title}</h3>
            <p>{content}</p>
            <p>작성일시 : {created}</p>
            <button>수정</button>
            <button>삭제</button>
        </li>
    );
}
export default Todo;
