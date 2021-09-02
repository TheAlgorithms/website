import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const QueryContext = createContext<[string, Dispatch<SetStateAction<string>>]>([
  undefined,
  undefined,
]);

export function QueryProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={[query, setQuery]}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  return useContext(QueryContext);
}
