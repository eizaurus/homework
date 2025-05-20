'use client';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Todo } from '@/types/todo';
import { queryClient } from '@/lib/queryClient';

export default function FilterTabs() {
	const pathname = usePathname();
	const todos: Todo[] = queryClient.getQueryData<Todo[]>(['todos']);
	const rawTabs = [
		{ label: 'Все', href: '/' },
		{ label: 'Активные', href: '/active' },
		{ label: 'Завершённые', href: '/completed' },
	];

	const getCount = (filter: string): number => {
		switch (filter) {
			case '/active':
				return todos && todos.length > 0 ? todos.filter((t) => !t.completed).length : 0;
			case '/completed':
				return todos && todos.length > 0 ? todos.filter((t) => t.completed).length : 0;
			case '/':
			default:
				return todos ? todos.length : 0;
		}
	};

	const sortedTabs = [...rawTabs].map((tab) => ({ ...tab, count: getCount(tab.href) })).sort((a, b) => b.count - a.count);

	return (
		<Tabs value={pathname} aria-label='todo tabs'>
			{sortedTabs.map((tab) => (
				<Tab key={tab.href} value={tab.href} component={Link} href={tab.href} label={tab.label} />
			))}
		</Tabs>
	);
}
