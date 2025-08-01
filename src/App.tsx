import { RandomNumber } from "./components/RandomNumber";
import { useRandomNumber } from "./hooks/useRandomNumber";
import "./App.css";

function App() {
  const { randomNumberQuery } = useRandomNumber();

  const handleRefreshRequest = () => {
    randomNumberQuery.refetch();
  };

  return (
    <>
      {randomNumberQuery.isLoading || randomNumberQuery.isFetching ? (
        <h1>Cargando...</h1>
      ) : (
        <h1>Número: {randomNumberQuery.data}</h1>
      )}

      <RandomNumber />

      {randomNumberQuery.isError ? (
        <>
          <br />
          <div>{randomNumberQuery.error?.message}</div>
          <br />
        </>
      ) : null}

      <br />
      <button
        onClick={handleRefreshRequest}
        disabled={randomNumberQuery.isLoading || randomNumberQuery.isFetching}
      >
        Nuevo número
      </button>
    </>
  );
}

export default App;
