import { Dayjs } from 'dayjs';

export type ItemTodo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
	createdAt: Dayjs;
	updatedAt: Dayjs | null;
};
export interface TodoListProps {
	children?: React.ReactNode;
}
export interface TabPanelProps {
	children?: React.ReactNode;
}
export interface FilterTabsProps {
	children?: React.ReactNode;
	count: number;
}
