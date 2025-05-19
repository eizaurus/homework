'use client';
import { MutateCheck, MutateDelete, queryClient } from '@/lib/queryClient';
import { ItemTodo } from '@/types/todo';
import { ListItem, Checkbox, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ToDoInput from './TodoInput';
export const TaskItem = ({ task, index }: { task: ItemTodo; index: number }) => {
	const [title, setTitle] = useState(task.title);
	const [check, setChecked] = useState(task.completed);
	const [editTask, setEditTask] = useState(false);
	const changeToggle = useMutation({
		mutationFn: (variables: { id: number; title?: string; completed?: boolean; isDelete?: boolean }) => MutateCheck(variables),
		onError: (error, variables) => {
			console.error('Error:', error);
			console.log('Failed post data:', variables);
		},
		onSuccess: (variables) => {
			console.log('Success:', variables);
			queryClient.invalidateQueries(['todos']);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});
	const DeleteTask = useMutation({
		mutationFn: (variables: { id: number; isDelete: boolean }) => MutateDelete(variables),
		onError: (error, variables) => {
			console.error('Error:', error);
			console.log('Failed post data:', variables);
		},
		onSuccess: (variables) => {
			console.log('Success:', variables);
			queryClient.invalidateQueries(['todos']);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
	});
	return (
		<ListItem
			secondaryAction={
				<IconButton
					edge='end'
					aria-label='comments'
					onClick={() => {
						DeleteTask.mutate({ id: task.id, isDelete: true });
					}}
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemIcon>
				<Checkbox
					edge='end'
					onChange={(e) => {
						setChecked(e.target.checked);
						changeToggle.mutate({ id: task.id, completed: e.target.checked });
					}}
					checked={check}
					slotProps={{ input: { 'aria-labelledby': `todolist-checkbox-${index}` } }}
				/>
			</ListItemIcon>
			{editTask ? (
				<ToDoInput
					title={title}
					changeValue={(event: React.ChangeEvent<HTMLInputElement>) => {
						setTitle(event.target.value);
					}}
					SendData={() => {
						changeToggle.mutate({ id: task.id, title: title });
						setEditTask(false);
					}}
				/>
			) : (
				<ListItemText primary={title} secondary={task.userId} sx={{ textDecorationLine: check ? 'line-through' : 'none', cursor: 'pointer' }} onDoubleClick={() => setEditTask(true)} />
			)}
		</ListItem>
	);
};
