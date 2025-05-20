import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import Providers from './providers';
import useLocalTodos from '@/hooks/useLocalTodos';
async function getDehydratedState() {
	const todos = useLocalTodos();
	queryClient.setQueryData(['todos'], () => todos);
	const dehydratedState = dehydrate(queryClient);
	return dehydratedState;
}
export default async function RootLayout({ children }: { children: ReactNode }) {
	const dehydratedState = await getDehydratedState();

	return (
		<html lang='ru'>
			<body>
				<Providers>
					<HydrationBoundary state={dehydratedState}>
						<ReactQueryDevtools initialIsOpen={true} />
						{children}
					</HydrationBoundary>
				</Providers>
			</body>
		</html>
	);
}
