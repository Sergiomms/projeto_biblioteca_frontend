import React from "react";
import axios from "axios";
import { Table, THead, TRow, Th, TBody, Td } from "./style";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const LoanGrid = ({ loans, setLoans, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/emprestimos/" + id);

      const newArray = loans.filter((loan) => loan.id !== id);
      setLoans(newArray);

      toast.success("Empréstimo deletado com sucesso!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao deletar empréstimo");
    }
    setOnEdit(null);
  };

  // 👉 Função para formatar data no padrão brasileiro
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Table>
      <THead>
        <TRow>
          <Th>Livro</Th>
          <Th>Leitor</Th>
          <Th>Data Empréstimo</Th>
          <Th>Data Devolução</Th>
          <Th></Th>
          <Th></Th>
        </TRow>
      </THead>

      <TBody>
        {Array.isArray(loans) &&
          loans.map((item, index) => (
            <TRow key={index}>
              <Td width="25%">{item.livro}</Td>
              <Td width="25%">{item.leitor}</Td>

              {/* Datas formatadas */}
              <Td width="20%">{formatDate(item.data_emprestimo)}</Td>
              <Td width="20%">{formatDate(item.data_devolucao)}</Td>

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

export default LoanGrid;
