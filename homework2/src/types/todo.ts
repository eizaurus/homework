import { Dayjs } from 'dayjs';

export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
	createdAt: Dayjs | string;
	updatedAt: Dayjs | string;
}
export interface Props {
	params: { id: string };
}
export interface TodoListProps {
	filter: 'all' | 'active' | 'completed';
}
