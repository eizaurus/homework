'use client';
import { loadData } from '@/lib/queryClient';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { TaskItem } from '@/components/TodoItem';
import TodoList from '@/components/TodoList';
import { useQuery } from '@tanstack/react-query';

export default function App() {
	const paths = usePathname();
	const id: string = paths.split('/')[2];
	const { status, data, error } = useQuery({ queryKey: ['todos', paths], queryFn: () => loadData(id) });
	if (status === 'pending') {
		return <span>Loading...</span>;
	}
	if (status === 'error') {
		return <span>Error: {error.message}</span>;
	}
	return (
		<TodoList>
			<TaskItem task={data} index={0} key={`list-${0}`} />
		</TodoList>
	);
}
