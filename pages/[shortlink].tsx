/* eslint-disable import/prefer-default-export */
import { GetServerSideProps } from "next";

export default function Shortlink() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const URLs = {
    discord: "https://discord.gg/c7MnfGFGa6",
  };
  if (context.params.shortlink && URLs[context.params.shortlink.toString()])
    return {
      redirect: {
        destination: URLs[context.params.shortlink.toString()],
        permanent: true,
      },
    };
  return {
    notFound: true,
  };
};
