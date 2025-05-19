'use client';
import * as React from 'react';
import { ItemTodo } from '@/types/todo';
import { useQueryClient } from '@tanstack/react-query';
import FilterTabs from '@/components/FilterTabs';
import { TaskItem } from '@/components/TodoItem';
import TodoList from '@/components/TodoList';
import { loadData, queryClient } from '@/lib/queryClient';
await queryClient.fetchQuery({
	queryKey: ['todos'],
	queryFn: () => loadData(),
});
export default function App() {
	const dataAll: ItemTodo[] = queryClient.getQueryData(['todos']);
	const data = dataAll.filter((i: ItemTodo) => i.completed === false);
	const length=data.length;
	return (
		<FilterTabs count={length}>
			<TodoList>
				{data.map((i: ItemTodo, index: number) => (
					<TaskItem task={i} index={index} key={`list-${index}`} />
				))}
			</TodoList>
		</FilterTabs>
	);
}
