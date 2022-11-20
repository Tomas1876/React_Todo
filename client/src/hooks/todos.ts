import { useTodos } from "../queries/todos"

export const useTodosPagable = (page = 0, count = 5) => {
    const { data } = useTodos();
    if(!data) {
        return;
    }
    const list = data.data;
    const totalItems = list.length;
    const pages = Math.floor(totalItems / count) + 1;
    const start = page === 0 ? 0 : count * (page === 0 ? 1 : page) - 1;
    const end = page === 0 ? count - 1 : count * (page + 1) - 1;

    const items = list.slice(start, end);

    return {
        items: items,
        pages: pages
    }
}
