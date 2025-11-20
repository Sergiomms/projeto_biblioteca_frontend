import React, { useState, useEffect } from "react";
import { FormContainer, Input, Label, Select, Button } from "./styles";
import axios from "axios";
import { toast } from "react-toastify";

const LoanForm = ({ onEdit, setOnEdit, getEmprestimos, livros, leitores }) => {
  const [livroId, setLivroId] = useState("");
  const [leitorId, setLeitorId] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [status, setStatus] = useState("emprestado");

  useEffect(() => {
    if (onEdit) {
      setLivroId(onEdit.livro_id || "");
      setLeitorId(onEdit.leitor_id || "");
      setDataEmprestimo(
        onEdit.data_emprestimo ? onEdit.data_emprestimo.slice(0, 10) : ""
      );
      setDataDevolucao(
        onEdit.data_devolucao ? onEdit.data_devolucao.slice(0, 10) : ""
      );
      setStatus(onEdit.status || "emprestado");
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!livroId || !leitorId || !dataEmprestimo) {
      return toast.warn(
        "Por favor, preencha livro, leitor e data de empréstimo."
      );
    }

    const payload = {
      livro_id: Number(livroId),
      leitor_id: Number(leitorId),
      data_emprestimo: dataEmprestimo,
      data_devolucao: dataDevolucao || null,
      status,
    };

    try {
      if (onEdit) {
        await axios.put(
          `http://localhost:8800/emprestimos/${onEdit.id}`,
          payload
        );
        toast.success("Empréstimo atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800/emprestimos", payload);
        toast.success("Empréstimo criado com sucesso!");
      }

      // Reset form
      setLivroId("");
      setLeitorId("");
      setDataEmprestimo("");
      setDataDevolucao("");
      setStatus("emprestado");
      setOnEdit(null);
      getEmprestimos();
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao salvar empréstimo.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>Livro</Label>
      <Select value={livroId} onChange={(e) => setLivroId(e.target.value)}>
        <option value="">Selecione um livro</option>
        {livros.map((b) => (
          <option key={b.id} value={b.id}>
            {b.titulo}
          </option>
        ))}
      </Select>

      <Label>Leitor</Label>
      <Select value={leitorId} onChange={(e) => setLeitorId(e.target.value)}>
        <option value="">Selecione um leitor</option>
        {leitores.map((r) => (
          <option key={r.id} value={r.id}>
            {r.nome}
          </option>
        ))}
      </Select>

      <Label>Data do empréstimo</Label>
      <Input
        type="date"
        value={dataEmprestimo}
        onChange={(e) => setDataEmprestimo(e.target.value)}
      />

      <Label>Data de devolução</Label>
      <Input
        type="date"
        value={dataDevolucao}
        onChange={(e) => setDataDevolucao(e.target.value)}
      />

      <Label>Status</Label>
      <Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="emprestado">emprestado</option>
        <option value="devolvido">devolvido</option>
      </Select>

      <Button type="submit">{onEdit ? "UPDATE" : "SAVE"}</Button>
    </FormContainer>
  );
};

export default LoanForm;
