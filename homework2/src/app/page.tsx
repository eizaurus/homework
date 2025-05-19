'use client';
import * as React from 'react';
import { ItemTodo } from '@/types/todo';
import { TaskItem } from '@/components/TodoItem';
import { loadData, queryClient } from '@/lib/queryClient';
import FilterTabs from '@/components/FilterTabs';
import TodoList from '@/components/TodoList';
await queryClient.fetchQuery({
	queryKey: ['todos'],
	queryFn: () => loadData(),
});
export default function App() {
	const data: ItemTodo[] = queryClient.getQueryData(['todos']);
	console.log(typeof data,Object.keys(data).length);
	return (
		<FilterTabs count={Object.keys(data).length}>
			<TodoList>
				{data.map((i: ItemTodo, index: number) => (
					<TaskItem task={i} index={index} key={`list-${index}`} />
				))}
			</TodoList>
		</FilterTabs>
	);
}
