import React from 'react';
import axios from "axios";
import { Table, THead, TRow, Th, TBody, Td } from './styles';
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const BookGrid = ({ livros, setLivros, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/livros/" + id);
      const newArray = livros.filter((livro) => livro.id !== id);
      setLivros(newArray);
      toast.success("Livro deletado com sucesso!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao deletar livro");
    }
    setOnEdit(null);
  }

  return (
    <Table>
      <THead>
        <TRow>
          <Th>Título</Th>
          <Th>Gênero</Th>
          <Th>Ano</Th>
          <Th>Autor</Th>
          <Th></Th>
          <Th></Th>
        </TRow>
      </THead>
      <TBody>
        {livros.map((item, i) => (
          <TRow key={i}>
            <Td width="25%">{item.titulo}</Td>
            <Td width="20%">{item.genero}</Td>
            <Td width="10%">{item.ano_publicacao}</Td>
            <Td width="25%">{item.autor}</Td>
            <Td alignCenter width="5%"> 
              <FaEdit onClick={() => handleEdit(item)} /> 
            </Td>
            <Td alignCenter width="5%"> 
              <FaTrash onClick={() => handleDelete(item.id)} /> 
            </Td>
          </TRow>
        ))}
      </TBody>
    </Table>
  );
};

export default BookGrid;