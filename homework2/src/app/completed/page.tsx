'use client';
import FilterTabs from '@/components/FilterTabs';
import TodoList from '@/components/TodoList';

export default function Page() {
	return (
		<>
			<FilterTabs />
			<TodoList filter='completed' />
		</>
	);
}
