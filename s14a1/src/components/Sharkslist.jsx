import { useState, useEffect } from 'react';

import Sharks from './Sharks.jsx';
import Error from './Error.jsx';

import { fetchAvailableSharks } from '../http.js';

export default function Sharkslists({ onSelectShark }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableSharks, setAvailableSharks] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchSharks() {
      setIsFetching(true);

      try {
        const sharks = await fetchAvailableSharks();
        
        setAvailableSharks(sharks);
        setIsFetching(false);
        
      } catch (error) {
        setError({
          message:
            error.message || 'Não foi possível obter os tubarões, por favor tente mais tarde.',
        });
        setIsFetching(false);
      }
    }

    fetchSharks();
  }, []);

  if (error) {
    return <Error title="Ocorreu um erro!" message={error.message} />;
  }

  return (
    <Sharks
      title="Tubarões existentes"
      sharks={availableSharks}
      isLoading={isFetching}
      loadingText="Carregando dados dos tubarões..."
      fallbackText="Não tem dados."
      onSelectShark={onSelectShark}
    />
  );
}
