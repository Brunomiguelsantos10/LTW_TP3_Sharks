import { useRef, useState, useCallback, useEffect } from 'react';

import Sharks from './components/Sharks.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import Sharkslists from './components/Sharkslist.jsx';
import { fetchUserSharks, updateUserSharks } from './http.js';
import Error from './components/Error.jsx';
import { useFatchData } from './hooks/useFetchData.js';

function App() {
  const selectedShark = useRef();

  const [errorUpdatingSharks, setErrorUpdatingSharks] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    isFetching,
    error,
    fetchedData: userSharks,
    setFetchedData: setUserSharks
  } = useFatchData(fetchUserSharks, []);

  function handleStartRemoveShark(shark) {
    setModalIsOpen(true);
    selectedShark.current = shark;
  }

  function handleStopRemoveShark() {
    setModalIsOpen(false);
  }

  async function handleSelectShark(selectedShark) {    
    setUserSharks((prevPickedSharks) => {
      if (!prevPickedSharks) {
        prevPickedSharks = [];
      }
      if (prevPickedSharks.some((shark) => shark.id === selectedShark.id)) {
        return prevPickedSharks;
      }
      return [selectedShark, ...prevPickedSharks];
    });

    try {
      await updateUserSharks([selectedShark, ...userSharks]);
    } catch (error) {
      setUserSharks(userSharks);
      setErrorUpdatingSharks({
        message: error.message || 'Falha actualizando tubarões.',
      });
    }
  }

  const handleRemoveShark = useCallback(
    async function handleRemoveShark() {
      setUserSharks((prevPickedSharks) =>
        prevPickedSharks.filter(
          (shark) => shark.id !== selectedShark.current.id
        )
      );

      try {
        await updateUserSharks(
          userSharks.filter((shark) => shark.id !== selectedShark.current.id)
        );
      } catch (error) {
        setUserSharks(userSharks);
        setErrorUpdatingSharks({
          message: error.message || 'Falha apagando tubarões.',
        });
      }

      setModalIsOpen(false);
    },
    [userSharks]
  );

  function handleError() {
    setErrorUpdatingSharks(null);
  }

  return (
    <>
      <Modal open={errorUpdatingSharks} onClose={handleError}>
        {errorUpdatingSharks && (
          <Error
            title="Ocorreu um erro!"
            message={errorUpdatingSharks.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemoveShark}>
        <DeleteConfirmation
          onCancel={handleStopRemoveShark}
          onConfirm={handleRemoveShark}
        />
      </Modal>

      <header>
      <img src={logoImg} alt="Logo Sharkpiker" />
        <h1>SharkPicker</h1>
        <p>
          Criar sua coleção pessoal de tubarões que já viu ou gostaria de ver nos mares de Cabo Verde
        </p>
      </header>
      <main>
        {error && <Error title="Ocoreu um erro!" message={error.message} />}
        {!error && (
          <Sharks
            title="Eu gostaria de ver ..."
            fallbackText="Selecione abaixo tubarões que você gostaria de ver."
            isLoading={isFetching}
            loadingText="Carregando tubarões..."
            sharks={userSharks}
            onSelectShark={handleStartRemoveShark}
          />
        )}

        <Sharkslists onSelectShark={handleSelectShark} />
      </main>
    </>
  );
}

export default App;
