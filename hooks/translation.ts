import { useTranslation as useNextTranslation } from "next-i18next";

export default function useTranslation() {
  const { t } = useNextTranslation("common");

  return (name: string, variables: { [key: string]: string } = {}) => {
    let str = t(name) || name;
    Object.keys(variables).forEach((from) => {
      str = str.replaceAll(`{${from}}`, variables[from]);
    });

    return str;
  };
}
