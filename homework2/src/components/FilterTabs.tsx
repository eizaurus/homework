import { FilterTabsProps, TabPanelProps } from '@/types/todo';
import { Box, Typography, AppBar, Tabs, Tab, Link } from '@mui/material';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import ToDoInput from './TodoInput';
import { MutateAdd, queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import StatsFooter from './StatsFooter';

function a11yProps(index: string) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}
function TabPanel(props: TabPanelProps) {
	const { children } = props;
	return (
		<Box sx={{ p: 3, height: 'calc(90vh - 200px)', overflowY: 'auto' }} id={`full-width-tabpanel`}>
			{children}
		</Box>
	);
}

export default function FilterTabs(props: FilterTabsProps) {
	const [title, setTitle] = useState('');
	const children = props.children;
	const count = props.count;
	console.log(children, count);
	const value = usePathname();
	const AddTask = useMutation({
		mutationFn: (variables: { title: string }) => MutateAdd(variables),
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
		<Box component='section' sx={{ p: 2, border: '1px dashed grey', width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
			<Typography variant='h5' gutterBottom>
				Todo List
			</Typography>
			<ToDoInput
				title={title}
				changeValue={(event: React.ChangeEvent<HTMLInputElement>) => {
					setTitle(event.target.value);
				}}
				SendData={() => {
					AddTask.mutate({ title: title });
					setTitle('');
				}}
			/>
			<AppBar position='static'>
				<Tabs value={value} indicatorColor='secondary' textColor='inherit' variant='fullWidth' aria-label='full width tabs example'>
					<Tab
						value='/'
						label={
							<Link href='/' underline='none' color='inherit'>
								Все
							</Link>
						}
						{...a11yProps('/')}
					/>
					<Tab
						value='/completed'
						label={
							<Link href='/completed' underline='none' color='inherit'>
								Завершенные
							</Link>
						}
						{...a11yProps('/completed')}
					/>
					<Tab
						value='/active'
						label={
							<Link href='/active' underline='none' color='inherit'>
								Активные
							</Link>
						}
						{...a11yProps('/active')}
					/>
				</Tabs>
			</AppBar>
			<TabPanel>{children}</TabPanel>
			<StatsFooter count={count} />
		</Box>
	);
}
