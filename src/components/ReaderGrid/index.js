import React from "react";
import axios from "axios";
import { Table, THead, TBody, TRow, Th, Td } from "./style";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const ReaderGrid = ({ leitores, onEdit, onDelete }) => {
  return (
    <Table>
      <THead>
        <TRow>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Telefone</Th>
          <Th></Th>
          <Th></Th>
        </TRow>
      </THead>
      <TBody>
        {leitores.map((reader, i) => (
          <TRow key={i}>
            <Td width="30%">{reader.nome}</Td>
            <Td width="30%">{reader.email}</Td>
            <Td width="25%">{reader.telefone}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => onEdit(reader)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => onDelete(reader.id)} />
            </Td>
          </TRow>
        ))}
      </TBody>
    </Table>
  );
};

export default ReaderGrid;
