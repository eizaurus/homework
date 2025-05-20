import dayjs from 'dayjs';
import { fetchTodos } from '../lib/api';
import { Todo } from '../types/todo';
import { queryClient } from '@/lib/queryClient';
const InitialData: string = JSON.stringify([
	{
		userId: 1,
		id: 1,
		title: 'first todo',
		completed: false,
		createdAt: dayjs(),
		updatedAt: dayjs(),
	},
]);
export default function useLocalTodos() {
	const local = typeof window !== 'undefined' ? localStorage.getItem('todos') : JSON.stringify([]);
	if (JSON.parse(local).length > 0) {
		const todos: Todo[] = JSON.parse(local);
		queryClient.setQueryData(['todos'], todos);
	} else {
		fetchTodos().then((todo) => {
			if (typeof window !== 'undefined') localStorage.setItem('todos', JSON.stringify(todo));
			queryClient.setQueryData(['todos'], todo);
		});
	}
}
