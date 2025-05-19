import { ItemTodo } from '@/types/todo';
import { QueryClient } from '@tanstack/react-query';
import { LoadTodoListAll, LoadTodoListCurrent } from './api';
import dayjs, { Dayjs } from 'dayjs';

export const queryClient = new QueryClient();

export function randomDate(): Dayjs {
	const endDate = new Date();
	const endDateYear = endDate.getUTCFullYear() - 1;
	const startDate = new Date(endDateYear, endDate.getUTCMonth(), endDate.getUTCDay());
	const randomDateDayjs = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
	return dayjs(randomDateDayjs);
}

export const loadData = async (id: string = ''): Promise<Array<ItemTodo>> => {
	try {
		const response = id === '' ? await LoadTodoListAll() : await LoadTodoListCurrent(id);
		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		}
		const responseJSON = await response.json();
		const responseJSONDate: ItemTodo[] =
			id === '' ? responseJSON.map((i: ItemTodo) => ({ ...i, updatedAt: null, createdAt: randomDate() })) : { ...responseJSON, updatedAt: null, createdAt: randomDate() };
		return responseJSONDate;
	} catch (error) {
		return Promise.reject(new Error('Data is not loading. Please refresh page or try later. Error: ' + JSON.stringify(error)));
	}
};

export const MutateCheck = async (variables: { id: number; title?: string; completed?: boolean }) => {
	try {
		await queryClient.cancelQueries(['todos']);
		const previousPosts: ItemTodo[] = queryClient.getQueryData(['todos']);
		for (let i = 0; i < previousPosts.length; i++) {
			if (previousPosts[i].id == variables.id) {
				previousPosts[i] = { ...previousPosts[i], ...variables, updatedAt: dayjs() };
			}
		}
		queryClient.setQueryData(['todos'], previousPosts);
		return { previousPosts };
	} catch (error) {
		throw new Error(`something wrong.Error:${error}`);
	}
};
export const MutateDelete = async (variables: { id: number }) => {
	try {
		await queryClient.cancelQueries(['todos']);
		const previousPosts: ItemTodo[] = queryClient.getQueryData(['todos']);
		const { id } = variables;
		for (let i = 0; i < previousPosts.length; i++) {
			if (previousPosts[i].id == id) {
				previousPosts.splice(i, 1);
			}
		}
		queryClient.setQueryData(['todos'], previousPosts);
		return { previousPosts };
	} catch (error) {
		throw new Error(`something wrong.Error:${error}`);
	}
};
export const MutateAdd = async (variables: { title: string }) => {
	try {
		await queryClient.cancelQueries(['todos']);
		const previousPosts: ItemTodo[] = queryClient.getQueryData(['todos']);
		const LastId = previousPosts[previousPosts.length - 1].id;
		queryClient.setQueryData(['todos'], (previousPosts: ItemTodo[]) => [
			...previousPosts,
			{ userId: 1, id: LastId, title: variables.title, completed: false, createdAt: dayjs(), updatedAt: null },
		]);
	} catch (error) {
		throw new Error(`something wrong.Error:${error}`);
	}
};
