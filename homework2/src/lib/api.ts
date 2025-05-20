import { Todo } from '@/types/todo';
import dayjs, { Dayjs } from 'dayjs';
import { queryClient } from './queryClient';
import { useMutation } from '@tanstack/react-query';

export function randomDate(): Dayjs {
	const endDate = new Date();
	const endDateYear = endDate.getUTCFullYear() - 1;
	const startDate = new Date(endDateYear, endDate.getUTCMonth(), endDate.getUTCDay());
	const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
	return dayjs(randomDate);
}

export const fetchTodos = async (): Promise<Todo[]> => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos');
	const data = await res.json();
	const dataDate: Todo[] = data.slice(0, 20).map((t: Todo) => ({
		...t,
		createdAt: dayjs()
			.subtract(Math.floor(Math.random() * 365), 'day')
			.toISOString(),
		updatedAt: dayjs().toISOString(),
	}));
	return dataDate.sort((a: Todo, b: Todo) => b.createdAt.valueOf() - a.createdAt.valueOf());
};

export const updateTodo = async (todo: Todo): Promise<Todo> => ({ ...todo, updatedAt: dayjs().toISOString() });

export const deleteTodo = async (id: number): Promise<number> => id;
let idCounter = 1000;
export const addTodo = async (title: string): Promise<Todo> => ({
	userId: 1,
	id: idCounter++,
	title,
	completed: false,
	createdAt: dayjs().toISOString(),
	updatedAt: dayjs().toISOString(),
});
export function useAddTodo() {
	return useMutation({
		mutationFn: addTodo,
		onMutate: async (newTodo) => {
			const current = queryClient.getQueryData<Todo[]>(['todos']);
			const last_id = current.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
			const updated = {
				userId: 1,
				id: last_id,
				title: newTodo,
				completed: false,
				createdAt: dayjs().toISOString(),
				updatedAt: dayjs().toISOString(),
			};
			console.log('updated', updated);
			queryClient.setQueryData<Todo[]>(['todos'], (old) => {
				return [...old, updated];
			});
			if (typeof window !== 'undefined') {
				localStorage.setItem('todos', JSON.stringify([...current, updated]));
			}
			return newTodo;
		},
	});
}
export function useUpdateTodo() {
	return useMutation({
		mutationKey: ['todos', 'update'],
		mutationFn: updateTodo,
		onMutate: async (updatedTodo) => {
			const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
			queryClient.setQueryData<Todo[]>(['todos'], (old) => {
				return old?.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo));
			});

			return { previousTodos };
		},
	});
}
export function useDeleteTodo() {
	return useMutation({
		mutationKey: ['todos', 'delete'],
		mutationFn: deleteTodo,
		onMutate: async (id) => {
			const current = queryClient.getQueryData<Todo[]>(['todos']) || [];
			const updated = current.filter((todo) => todo.id !== id);
			if (typeof window !== 'undefined') localStorage.setItem('todos', JSON.stringify(updated));

			return id;
		},
		onSuccess: (id: number) => {
			queryClient.setQueryData<Todo[]>(['todos'], (old) => old?.filter((todo) => todo.id !== id));
		},
	});
}
