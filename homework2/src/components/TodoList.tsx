import { TodoListProps } from "@/types/todo";
import { List } from "@mui/material";


export default function TodoList(props: TodoListProps) {
	const { children } = props;
	return <List>{children}</List>;
}
