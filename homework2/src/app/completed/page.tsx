'use client';
import * as React from 'react';
/* import { useState, useEffect } from 'react'; */
import { ItemTodo } from '@/types/todo';
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
	const data = dataAll.filter((i: ItemTodo) => i.completed === true);
	return (
		<FilterTabs count={Object.keys(data).length}>
			<TodoList>{data.length > 1 && data.map((i: ItemTodo, index: number) => <TaskItem task={i} index={index} key={`list-${index}`} />)}</TodoList>
		</FilterTabs>
	);
}
