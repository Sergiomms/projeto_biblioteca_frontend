import React, { useEffect, useState } from 'react';
import GlobalStyle from "./styles/global";
import { Container, Title, Box } from "./styles/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorForm from "./components/AuthorForm";
import Grid from "./components/Grid";
import axios from "axios";

function App() {

  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [autores, setAutores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

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


    useEffect(() => {
    console.log("DEBUG", onEdit);
  }, [onEdit])


  return (
    <>

      <Container>
        <Title>Biblioteca Aurora</Title>
        <Box onClick={() => setShowAuthorForm(!showAuthorForm)}>
          Cadastro de Autores
        </Box>

        {showAuthorForm && (
          <>
            <AuthorForm onEdit={onEdit} setOnEdit={setOnEdit} getAutores={getAutores}/>
            <Grid autores={autores} setAutores={setAutores} setOnEdit={setOnEdit} />
          </>
        )}

      </Container>
      <ToastContainer autoClose={3000} position="top-left" />
      <GlobalStyle />

    </>
  );
}

export default App;
