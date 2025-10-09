import React, { useRef, useEffect, useState } from 'react';
import { FormContainer, Input, Label, Button } from './style';
import axios from "axios";
import { toast } from "react-toastify";


const AuthorForm = ({ onEdit, setOnEdit, getAutores }) => {
  const ref = useRef();

  const [autor, setAutor] = useState("");
  const [biografia, setBiografia] = useState("");

  useEffect(() => {
    if (onEdit) {
      setAutor(onEdit.nome);
      setBiografia(onEdit.biografia);
    }
  }, [onEdit])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (autor === "" || biografia === "") {
      return toast.warn("Preencha todos os campos!")
    }

    if (onEdit) {
      await axios.put("http://localhost:8800/autores/" + onEdit.id,
        {
          nome: autor,
          biografia: biografia
        }
      ).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data))
    } else {
      await axios.post("http://localhost:8800/autores",
        {
          nome: autor,
          biografia: biografia
        }
      ).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data))
    }

    setAutor("");
    setBiografia("");
    setOnEdit(null);
    getAutores();
  }

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>

      <Label>Nome</Label>
      <Input name="nome" onChange={(e) => setAutor(e.target.value)} value={autor}/>

      <Label>Biografia</Label>
      <Input name="biografia" onChange={(e) => setBiografia(e.target.value)} value={biografia}/>

      <Button type='submit'>SALVAR</Button>
    </FormContainer>
  );

}

export default AuthorForm;