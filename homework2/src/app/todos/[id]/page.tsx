'use client';
import ComponentTodoEditPage from '@/components/TodoEditPage';
import { Props } from '@/types/todo';

export default function TodoEditPage({ params }: Props) {
	const id = Number(params.id);
	return (
		<>
			<ComponentTodoEditPage id={id} />
		</>
	);
}
