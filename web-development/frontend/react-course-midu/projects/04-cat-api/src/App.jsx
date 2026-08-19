import "./style.css";
import { useCatAppi } from "./Hooks/useCatImage.js";

export function App() {
  const [fact, imageUrl, toggleParar] = useCatAppi();

  return (
    <>
      <div>
        <p>API Gatitos</p>
        <p>{fact}</p>
        <img src={imageUrl} alt="cat" />
        <button onClick={toggleParar}>Stop</button>
      </div>
    </>
  );
}
