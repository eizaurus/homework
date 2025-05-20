'use client';
import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Todo } from '../types/todo';
import { useDeleteTodo, useUpdateTodo } from '@/lib/api';
import TodoInput from './TodoInput';

export default function TodoItem({ todo }: { todo: Todo }) {
	const [editing, setEditing] = useState(false);
	
	const updateMutation = useUpdateTodo();

	const deleteMutation = useDeleteTodo();
	const handleToggle = () => {
		updateMutation.mutate({ ...todo, completed: !todo.completed });
	};
	return (
		<ListItem
			secondaryAction={
				<IconButton edge='end' onClick={() => deleteMutation.mutate(todo.id)}>
					<DeleteIcon />
				</IconButton>
			}
			disablePadding
		>
			<Checkbox checked={todo.completed} onChange={handleToggle} />
			{editing ? (
				<TodoInput
					initialValue={todo.title}
					onAdd={(value) => {
						updateMutation.mutate({ ...todo, title: value });
						setEditing(false);
					}}
				/>
			) : (
				<ListItemText primary={todo.title} onDoubleClick={() => setEditing(true)} sx={{ cursor: 'pointer' }} />
			)}
		</ListItem>
	);
}
