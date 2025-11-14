import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import "./Home.css";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const carregarUsuarios = async () => {
    setLoading(true);
    setErro(false);
    try {
      const data = await getUsers();
      setUsuarios(data);
      const cidadesUnicas = [...new Set(data.map((u) => u.address.city))];
      setCidades(cidadesUnicas);
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const filtrados = usuarios.filter((u) => {
    const nomeOuEmail = `${u.name} ${u.email}`
      .toLowerCase()
      .includes(busca.toLowerCase());
    const filtroCidade = cidade ? u.address.city === cidade : true;
    return nomeOuEmail && filtroCidade;
  });

  if (loading) return <p>Carregando usuários...</p>;
  if (erro)
    return (
      <div>
        <p>Erro ao carregar usuários.</p>
        <button onClick={carregarUsuarios}>Tentar novamente</button>
      </div>
    );

  return (
    <div className="home">
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
          <option value="">Todas as cidades</option>
          {cidades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p>
        Exibindo {filtrados.length} de {usuarios.length} usuários
      </p>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((u, i) => (
            <tr
              key={u.id}
              className={i % 2 === 0 ? "linha-par" : "linha-impar"}
            >
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                <a href={`/usuario/${u.id}`} className="botao">
                  Ver detalhes
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
