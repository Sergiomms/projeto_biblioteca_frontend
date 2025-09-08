import React from 'react';
import axios from "axios";
import { Table, THead, TRow, Th, TBody, Td } from './styles';
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({ autores, setAutores, setOnEdit }) => {


  const handleEdit = (item) => {
    setOnEdit(item);
  }

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:8800/autores/" + id).then(({ data }) => {
      const newArray = autores.filter((autor) => autor.id !== id);

      setAutores(newArray);
      toast.success(data);
    }).catch(({ data }) => toast.error(data));

    setOnEdit(null);

  }

  return (

    <Table>
      <THead>
        <TRow>
          <Th>Nome</Th>
          <Th>Biografia</Th>
          <Th></Th>
          <Th></Th>
        </TRow>
      </THead>
      <TBody>
        {autores.map((item, i) => (
          <TRow key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td>{item.biografia}</Td>
            <Td alignCenter width="5%"> <FaEdit onClick={() => handleEdit(item)} /> </Td>
            <Td alignCenter width="5%"> <FaTrash onClick={() => handleDelete(item.id)} /> </Td>
          </TRow>
        ))}
      </TBody>
    </Table>

  );

};

export default Grid;