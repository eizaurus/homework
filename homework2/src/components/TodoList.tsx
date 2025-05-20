'use client';
import { List } from '@mui/material';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import StatsFooter from './StatsFooter';
import { TodoListProps } from '@/types/todo';
import useLocalTodos from '@/hooks/useLocalTodos';
import { useAddTodo } from '@/lib/api';

export default function TodoList({ filter }: TodoListProps) {
	const { data: todos } = useQuery({ queryKey: ['todos'], queryFn: useLocalTodos });
	const addMutation = useAddTodo();
	const filtered =
		todos && todos.length > 0
			? todos.filter((todo) => (filter === 'all' ? true : filter === 'active' ? !todo.completed : todo.completed)).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
			: [];
	return (
		<>
			<TodoInput onAdd={(title) => addMutation.mutate(title)} />
			<List>
				{filtered.map((todo, index) => {
					/* console.log('todo', todo); */
					return <TodoItem key={index} todo={todo} />;
				})}
			</List>
			<StatsFooter count={filtered.length} />
		</>
	);
}
