import {
  EnhancedEncryption,
  FormatQuote,
  Functions,
  InsertPhoto,
  OfflineBolt,
  Search,
  Sort,
  Storage,
} from "@material-ui/icons";
import useTranslation from "./translation";

type Category = {
  name: string;
  icon: JSX.Element;
  href: string;
};
export default function useCategories(): Category[] {
  const t = useTranslation();
  return [
    {
      name: t("categories:sorts"),
      icon: <Sort />,
      href: "/category/sorts",
    },
    {
      name: t("categories:searches"),
      icon: <Search />,
      href: "/category/searches",
    },
    {
      name: t("categories:dynamicprogramming"),
      icon: <OfflineBolt />,
      href: "/category/dynamicprogramming",
    },
    {
      name: t("categories:ciphers"),
      icon: <EnhancedEncryption />,
      href: "/category/ciphers",
    },
    {
      name: t("categories:datastructures"),
      icon: <Storage />,
      href: "/category/datastructures",
    },
    {
      name: t("categories:math"),
      icon: <Functions />,
      href: "/category/math",
    },
    {
      name: t("categories:digitalimageprocessing"),
      icon: <InsertPhoto />,
      href: "/category/digitalimageprocessing",
    },
    {
      name: t("categories:strings"),
      icon: <FormatQuote />,
      href: "/category/strings",
    },
  ];
}
