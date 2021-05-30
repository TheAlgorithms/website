import { Link } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import sanitizeHtml from "sanitize-html";

export default function Translation({
  name,
  links = [],
  variables = {},
}: {
  name: string;
  links?: string[];
  variables?: { [key: string]: string };
}) {
  const { t } = useTranslation("common");

  let str = t(name);
  Object.keys(variables).forEach((from) => {
    str = str.replace(new RegExp(`{${from}}`, "g"), variables[from]);
  });

  const split = str.split(/\[.+?\]/g);
  const matches = str.matchAll(/\[(.+?)\]/g);
  const linkContents = [];
  for (let x of matches) {
    linkContents.push(x[1]);
  }

  return (
    <>
      {split.flatMap((content, index) => [
        <span
          key={index * 2}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(content, {
              allowedTags: ["code", "b", "i"],
            }),
          }}
        />,
        ...(links[index]
          ? [
              <Link key={index * 2 + 1} href={links[index]}>
                <span
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(linkContents[index], {
                      allowedTags: ["code", "b", "i"],
                    }),
                  }}
                />
              </Link>,
            ]
          : []),
      ])}
    </>
  );
}
