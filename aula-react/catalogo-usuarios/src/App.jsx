import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [busca, setBusca] = useState("");

  async function carregarUsuarios() {
    try {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!resposta.ok) throw new Error("Falha ao carregar usuários");

      const dados = await resposta.json();
      console.log("aqui estao os dados: ", dados);

      setUsuarios(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catálogo de Usuários</h1>

      {carregando && <p>Carregando usuários...</p>}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <input
        type="text"
        placeholder="Buscar por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <ul>
        {usuarios
          .filter((u) => u.name.toLowerCase().includes(busca.toLowerCase()))

          .map((u) => (
            <li key={u.id} style={{ marginBottom: "10px" }}>
              <strong>{u.name}</strong>
              <br />
              Email: {u.email}
              <br />
              Cidade: {u.address.city}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
