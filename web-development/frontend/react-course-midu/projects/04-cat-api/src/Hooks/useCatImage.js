import { useEffect, useState } from "react";

export function useCatAppi() {
  const urlFact = "https://catfact.ninja/fact";

  const [fact, setFact] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [timer, setTimer] = useState(0);
  const [parar, setParar] = useState(true);

  const toggleParar = () => {
    setParar((prev) => !prev);
  };

  useEffect(() => {
    if (!parar) return;
    const id = setTimeout(() => {
      setTimer((prev) => prev + 1);
    }, 5000);

    fetch(urlFact)
      .then((result) => result.json())
      .then((data) => {
        const facto = data.fact;
        const spliteado = facto.split(" ").slice(0, 2).join(" ");

        setimageUrl(`https://cataas.com/cat/says/${spliteado}`);
        setFact(data.fact);
      });
    return () => clearTimeout(id);
  }, [timer, parar]);

  return [fact, imageUrl, toggleParar];
}
