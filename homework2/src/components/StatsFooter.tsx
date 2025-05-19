import { Box, Typography } from '@mui/material';

export default function StatsFooter({ count }: { count: number }) {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='subtitle1' gutterBottom>
				Select {count} task
			</Typography>
		</Box>
	);
}
