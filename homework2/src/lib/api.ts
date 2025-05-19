export const LoadTodoListAll = async () => {
	return await fetch('https://jsonplaceholder.typicode.com/todos');
};

export const LoadTodoListCurrent = async (id: string) => {
	return await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
};


