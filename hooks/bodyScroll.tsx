import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useBodyScroll(): [
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = hidden ? "hidden" : "auto";
  }, [hidden]);

  return [hidden, setHidden];
}
