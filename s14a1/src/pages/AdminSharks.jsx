import { useQuery } from "@tanstack/react-query";
import { fetchAvailableSharks } from "../http.js";
import { Link } from "react-router-dom";

export default function AdminSharks() {
  const { data: sharks, isLoading, error } = useQuery({
    queryKey: ["sharks"],
    queryFn: fetchAvailableSharks,
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os tubarões.</p>;

  return (
    <div className="admin-container">
      <h1>Lista de Tubarões</h1>
      <Link to="/admin/sharks/novo" className="button">Adicionar Novo Tubarão</Link>
      <table>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Imagem</th></tr>
        </thead>
        <tbody>
          {sharks.map((shark) => (
            <tr key={shark.id}>
              <td>{shark.id}</td>
              <td>{shark.title}</td>
              <td>
                <img src={`http://localhost:4000/${shark.image.src}`} alt={shark.image.alt} width="100"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
