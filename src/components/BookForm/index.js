import React, { useState, useEffect } from "react";
import { FormContainer, Input, Label, Button } from "./styles";
import axios from "axios";
import { toast } from "react-toastify";

const BookForm = ({ onEdit, setOnEdit, getLivros, autores }) => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [anoPublicado, setAnoPublicado] = useState("");
  const [autorNome, setAutorNome] = useState("");

  useEffect(() => {
    if (onEdit) {
      setTitulo(onEdit.titulo);
      setGenero(onEdit.genero);
      setAnoPublicado(onEdit.ano_publicacao);
      setAutorNome(onEdit.autor);
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !genero || !anoPublicado || !autorNome) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        await axios.put("http://localhost:8800/livros/" + onEdit.id, {
          titulo,
          genero,
          ano_publicado: anoPublicado,
          autor_nome: autorNome,
        });
        toast.success("Livro atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800/livros", {
          titulo,
          genero,
          ano_publicado: anoPublicado,
          autor_nome: autorNome,
        });
        toast.success("Livro cadastrado com sucesso!");
      }
      setTitulo("");
      setGenero("");
      setAnoPublicado("");
      setAutorNome("");
      setOnEdit(null);
      getLivros();
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao salvar livro");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>Título</Label>
      <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

      <Label>Gênero</Label>
      <Input value={genero} onChange={(e) => setGenero(e.target.value)} />

      <Label>Ano de Publicação</Label>
      <Input
        type="number"
        value={anoPublicado}
        onChange={(e) => setAnoPublicado(e.target.value)}
      />

      <Label>Autor</Label>
      <select
        value={autorNome}
        onChange={(e) => setAutorNome(e.target.value)}
      >
        <option value="">Selecione um autor</option>
        {autores.map((autor) => (
          <option key={autor.id} value={autor.nome}>
            {autor.nome}
          </option>
        ))}
      </select>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default BookForm;