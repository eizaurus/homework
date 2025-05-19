import { TextField, InputAdornment, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

export default function ToDoInput({ title, changeValue, SendData }: { title: string; changeValue: any; SendData: any }) {
	const handleMouse = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	return (
		<TextField
			fullWidth
			id='outlined-search'
			label='Search field'
			type='search'
			value={title}
			onChange={changeValue}
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton aria-label={'change Task text'} onClick={SendData} onMouseDown={handleMouse} onMouseUp={handleMouse} edge='end'>
								<DoneIcon />
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	);
}
