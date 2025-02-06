import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function NewShark() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    const response = await fetch("http://localhost:4000/sharks", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      navigate("/admin/sharks");
    } else {
      alert("Erro ao adicionar o tubarão!");
    }
  }

  return (
    <div className="admin-container">
      <h1>Registrar Novo Tubarão</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Descrição:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Imagem:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

        <button type="submit" className="button">Registrar</button>
      </form>
    </div>
  );
}