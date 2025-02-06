export async function fetchAvailableSharks() {
  const response = await fetch('http://localhost:4000/sharks');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Falha ao procurar tubarões');
  }

  return resData.sharks;
}

export async function fetchUserSharks() {
  const response = await fetch('http://localhost:4000/user-sharks');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Falha ao procurar tubarões de user');
  }

  return resData.sharks;
}

export async function updateUserSharks(sharks) {
  const response = await fetch('http://localhost:4000/user-sharks', {
    method: 'PUT',
    body: JSON.stringify({ sharks }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Falha ao actualizar.');
  }

  return resData.message;
}
