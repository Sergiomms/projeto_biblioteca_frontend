import React, { useEffect, useState } from 'react';
import GlobalStyle from "./styles/global";
import { Container, Title, Box } from "./styles/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorForm from "./components/AuthorForm";
import Grid from "./components/Grid";
import BookForm from './components/BookForm';
import BookGrid from './components/BookGrid';
import ReaderForm from "./components/ReaderForm";
import ReaderGrid from "./components/ReaderGrid";
import axios from "axios";

function App() {

   // --------- AUTORES ----------
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [autores, setAutores] = useState([]);
  const [onEditAutor, setOnEditAutor] = useState(null);

  const getAutores = async () => {
    try {
      const res = await axios.get("http://localhost:8800/autores");
      setAutores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getAutores();
  }, [setAutores])

  // --------- LIVROS ----------
  const [showBookForm, setShowBookForm] = useState(false);
  const [livros, setLivros] = useState([]);
  const [onEditLivro, setOnEditLivro] = useState(null);

  const getLivros = async () => {
    try {
      const res = await axios.get("http://localhost:8800/livros");
      setLivros(res.data.sort((a, b) => (a.titulo > b.titulo ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao carregar livros");
    }
  };

  useEffect(() => {
    getLivros();
  }, []);
  
  // --------- LEITORES ----------
  const [showReaderForm, setShowReaderForm] = useState(false);
  const [leitores, setLeitores] = useState([]);
  const [editingReader, setEditingReader] = useState(null);

  const getLeitores = async () => {
    const res = await axios.get("http://localhost:8800/leitores");
    setLeitores(res.data);
  };

  useEffect(() => {
    getLeitores();
  }, []);

  const handleAdd = () => getLeitores();
  const handleEdit = () => {
    setEditingReader(null);
    getLeitores();
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8800/leitores/${id}`);
    getLeitores();
  };
  

  return (
    <>

      <Container>
        <Title>Biblioteca Aurora</Title>

        {/* --------- AUTORES --------- */}
        <Box onClick={() => setShowAuthorForm(!showAuthorForm)}>
          Cadastro de Autores
        </Box>

        {showAuthorForm && (
          <>
            <AuthorForm onEdit={onEditAutor} setOnEdit={setOnEditAutor} getAutores={getAutores}/>
            <Grid autores={autores} setAutores={setAutores} setOnEdit={setOnEditAutor} />
          </>
        )}

        {/* --------- LIVROS --------- */}
        <Box onClick={() => setShowBookForm(!showBookForm)}>
          Cadastro de Livros
        </Box>

        {showBookForm && (
          <>
            <BookForm
              onEdit={onEditLivro}
              setOnEdit={setOnEditLivro}
              getLivros={getLivros}
              autores={autores}
            />
            <BookGrid
              livros={livros}
              setLivros={setLivros}
              setOnEdit={setOnEditLivro}
            />
          </>
        )}

        {/* --------- LEITORES --------- */}
        <Box onClick={() => setShowReaderForm(!showReaderForm)}>
          Cadastro de Leitores
        </Box>

         {showReaderForm && (
          <>
            <ReaderForm
              onAdd={handleAdd}
              onEdit={handleEdit}
              editingReader={editingReader}
            />

            <ReaderGrid
              leitores={leitores}
              onEdit={(reader) => setEditingReader(reader)}
              onDelete={handleDelete}
            />
          </>
         )}
      
      </Container>
      <ToastContainer autoClose={3000} position="top-left" />
      <GlobalStyle />

    </>
  );
}

export default App;
