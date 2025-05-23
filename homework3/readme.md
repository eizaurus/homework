📌 Задание. useClickOutside — Отслеживание кликов вне элемента

Пример:
const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, () => setIsOpen(false));

📌 Задание  useHover
Создай хук, который возвращает ref и isHovered: boolean. С его помощью можно отследить, навёлся ли пользователь на элемент.
Пример:
const [hoverRef, isHovered] = useHover<HTMLDivElement>();


📌 Задание useFetch
Напиши универсальный хук useFetch<T>, который:
принимает URL


возвращает data, loading, error


Обязательно типизируй ответ с помощью дженериков.
Пример:
const { data, loading, error } = useFetch<User[]>('/api/users');

