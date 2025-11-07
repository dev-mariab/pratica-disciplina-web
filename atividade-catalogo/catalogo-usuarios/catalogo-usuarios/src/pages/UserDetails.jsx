import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, getUserPosts } from "../services/api";
import "./UserDetails.css";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [erro, setErro] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const u = await getUserById(id);
        setUser(u);
        const p = await getUserPosts(id);
        setPosts(p);
      } catch {
        setErro(true);
      }
    };
    carregar();
  }, [id]);

  if (erro) return <p>Erro ao carregar dados do usuário.</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <div className="detalhes">
      <h2>{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Telefone:</strong> {user.phone}
      </p>
      <p>
        <strong>Empresa:</strong> {user.company.name}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <p>
        <strong>Endereço:</strong> {user.address.street}, {user.address.city}
      </p>

      <h3>Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <p>
            <strong>{post.title}</strong>
          </p>
          <button
            onClick={() =>
              setSelecionado(selecionado === post.id ? null : post.id)
            }
          >
            {selecionado === post.id ? "Fechar" : "Ver conteúdo"}
          </button>
          {selecionado === post.id && <p>{post.body}</p>}
        </div>
      ))}
    </div>
  );
}
