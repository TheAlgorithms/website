import { loadPyodide } from "lib/pyodide/pyodide";

let pyodide;

export default async function tryLoadPyodide() {
  if (!pyodide) {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/",
    });
  }
  return pyodide;
}
