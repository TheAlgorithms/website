import {
  useContext,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

const DarkThemeContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([undefined, undefined]);

export function DarkThemeProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const [darkTheme, setDarkTheme] = value;

  useEffect(() => {
    setDarkTheme(
      localStorage.getItem("theme")
        ? localStorage.getItem("theme") === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }, [setDarkTheme]);

  useEffect(() => {
    if (darkTheme)
      document.getElementsByTagName("html")[0].classList.add("dark");
    else document.getElementsByTagName("html")[0].classList.remove("dark");
  }, [darkTheme]);

  return (
    <DarkThemeContext.Provider value={[darkTheme, setDarkTheme]}>
      {children}
    </DarkThemeContext.Provider>
  );
}

export function useDarkTheme() {
  return useContext(DarkThemeContext);
}
