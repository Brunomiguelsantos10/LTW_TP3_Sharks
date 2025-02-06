import { useState, useEffect } from "react";

export function useFatchData(fetchFn, valorInicial){

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(valorInicial);

    useEffect(() => {
        async function fetchSharks() {
          setIsFetching(true);
          try {
            const sharks = await fetchFn();
            setFetchedData(sharks);
          } catch (error) {
            setError({ message: error.message || 'Falha carregando tubarões de user.' });
          }
          setIsFetching(false);
        }
        fetchSharks();
      }, [fetchFn]);

      return {
        isFetching,
        error,
        fetchedData,
        setFetchedData
      }
    }