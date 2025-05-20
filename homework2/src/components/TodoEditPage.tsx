'use client';
import { fetchTodos } from '@/lib/api';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import TodoItem from './TodoItem';
import useLocalTodos from '@/hooks/useLocalTodos';

export default function ComponentTodoEditPage({ id }: { id: number }) {
	const { data: todos = [] } = useQuery({ queryKey: ['todos'], queryFn: useLocalTodos });
	const todo = todos.find((t) => t.id === id);
	if (!todo) {
		return <p>Задача не найдена</p>;
	}
	return (
		<Box>
			<Typography variant='subtitle1' gutterBottom>
				Редактирование задачи #{id}
			</Typography>
			<TodoItem todo={todo} />
		</Box>
	);
}
