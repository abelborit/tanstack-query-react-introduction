import { useEffect, useState } from "react";
import "./App.css";

/* random number api -> https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new */
const RANDOM_NUMBER_API =
  "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new";

function App() {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshRequest, setRefreshRequest] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    fetch(RANDOM_NUMBER_API)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setValue(data);
        setError("");
      })
      .catch((error) => {
        setValue(0);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshRequest]);

  const handleRefreshRequest = () => {
    setRefreshRequest((prevState) => prevState + 1);
  };

  return (
    <>
      {isLoading ? <h1>Cargando...</h1> : <h1>Número: {value}</h1>}

      {error ? (
        <>
          <br />
          <div>{error}</div>
          <br />
        </>
      ) : null}

      <button onClick={handleRefreshRequest} disabled={isLoading}>
        Nuevo número
      </button>
    </>
  );
}

export default App;
