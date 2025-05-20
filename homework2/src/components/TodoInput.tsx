'use client';
import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

export default function TodoInput({ onAdd, initialValue = '' }: { initialValue?: string; onAdd: (title: string) => void }) {
	const [title, setTitle] = useState(initialValue);
	const handleSubmit = () => {
		if (title.trim()) {
			onAdd(title);
			setTitle('');
		}
	};
	return (
		<TextField
			fullWidth
			label='Добавить задачу'
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton onClick={handleSubmit} edge='end'>
								<DoneIcon />
							</IconButton>
						</InputAdornment>
					),
				},
			}}
			onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
		/>
	);
}
