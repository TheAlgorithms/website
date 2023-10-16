// eslint-disable-next-line import/prefer-default-export
export function createNewPlayground(language: string, code = "", tests = "") {
  const id = generateId();
  localStorage.setItem(id, JSON.stringify({ language, code, tests }));
  return id;
}

function generateId() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}
