import { useRef, useState } from 'react';
import { useClickOutside, useHover, useFetch } from './Hooks/useHooks';
import { Todo } from './types/types';

function App() {
const ref = useRef<HTMLDivElement>(null);
  const [open, setIsOpen] = useState<boolean>(false);
  useClickOutside(ref, (res) => setIsOpen(res));

  const [ref2, isHover] = useHover<HTMLHeadingElement>();

  const [data, loading, error] = useFetch<Todo>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  return (
    <div className="App">
      <div id="customHooks_useClickOutside">
        <h2 ref={ref}>
          Тут работает
          <br />
          <span>И тут работает</span>
        </h2>
        <h4>А тут не работает</h4>
        {open.toString()}
      </div>
      <div id="customHooks_useHover">
        <h2 ref={ref2}>
          Тут работает
          <br />
          <span>И тут работает</span>
        </h2>
        {isHover ? <h4>выше работает</h4> : <h4>а здесь нет</h4>}
      </div>
      <div id="customHooks_useFetch">
        <h2>Блок useFetch()</h2>
        <h4>{loading ? "загрузка" : "Загрузка окончена"}</h4>
        <h4>{error ? error : ""}</h4>
        <code>{JSON.stringify(data, null, 4)}</code>
      </div>
    </div>
  );
}

export default App;
