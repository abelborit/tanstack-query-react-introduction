import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { RandomNumber } from "./components/RandomNumber";

/* random number api -> https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new */
const RANDOM_NUMBER_API =
  "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new";

const getRandomNumber = async (): Promise<number> => {
  console.log("[App] - getRandomNumber");
  const response = await fetch(RANDOM_NUMBER_API).then((response) => {
    return response.json();
  });

  return Number(response);
};

function App() {
  const { isLoading, isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ["randomNumber"],
    queryFn: getRandomNumber,
    staleTime: 1000 * 60, // tiempo de que se considera "fresca" o "reciente" la petición
    // refetchOnWindowFocus: false, // para que al salir y volver a entrar a la pestaña no se hagan re-peticiones de forma innecesaria, aunque colocando el "staleTime" de cierta forma no lo realiza porque ya se configuró para que se considere "fresca" o "reciente" la petición
  });

  const handleRefreshRequest = () => {
    refetch();
  };

  return (
    <>
      {isLoading || isFetching ? <h1>Cargando...</h1> : <h1>Número: {data}</h1>}

      <RandomNumber />

      {isError ? (
        <>
          <br />
          <div>{error.message}</div>
          <br />
        </>
      ) : null}

      <br />
      <button onClick={handleRefreshRequest} disabled={isLoading || isFetching}>
        Nuevo número
      </button>
    </>
  );
}

export default App;
