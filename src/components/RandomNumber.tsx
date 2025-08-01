import { useQuery } from "@tanstack/react-query";

/* random number api -> https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new */
const RANDOM_NUMBER_API =
  "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new";

const getRandomNumber = async (): Promise<number> => {
  console.log("[RandomNumber] - getRandomNumber");
  const response = await fetch(RANDOM_NUMBER_API).then((response) => {
    return response.json();
  });

  return Number(response);
};

export const RandomNumber = () => {
  const { data } = useQuery({
    queryKey: ["randomNumber"],
    queryFn: getRandomNumber,
    staleTime: 1000 * 60, // tiempo de que se considera "fresca" o "reciente" la petición
    // refetchOnWindowFocus: false, // para que al salir y volver a entrar a la pestaña no se hagan re-peticiones de forma innecesaria, aunque colocando el "staleTime" de cierta forma no lo realiza porque ya se configuró para que se considere "fresca" o "reciente" la petición
  });

  return (
    <>
      <div>Random Number: {data}</div>
    </>
  );
};
