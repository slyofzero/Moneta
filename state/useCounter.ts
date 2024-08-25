import { useAtom, atom } from "jotai";

interface Counter {
  count: number;
}

const defaultCounter: Counter = { count: 0 };
const counterAtom = atom<Counter>(defaultCounter);

export function useCounter() {
  const [counter, setCounter] = useAtom(counterAtom);
  return { counter, setCounter };
}
