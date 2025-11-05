import React, { useState, useEffect } from "react";
import { FormContainer, Input, Label, Button } from "./style";
import axios from "axios";
import { toast } from "react-toastify";

const ReaderForm = ({ onAdd, onEdit, editingReader }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    if (editingReader) {
      setNome(editingReader.nome);
      setEmail(editingReader.email);
      setTelefone(editingReader.telefone);
    }
  }, [editingReader]);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    // limita a 11 dígitos (padrão brasileiro)
    if (value.length > 11) value = value.slice(0, 11);

    // aplica máscara (41) 96544-3322
    if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else {
      value = value.replace(/^(\d*)/, "($1");
    }

    setTelefone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !telefone) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (editingReader) {
        await axios.put(`http://localhost:8800/leitores/${editingReader.id}`, {
          nome,
          email,
          telefone,
        });
        toast.success("Leitor atualizado com sucesso!");
        onEdit();
      } else {
        await axios.post("http://localhost:8800/leitores", {
          nome,
          email,
          telefone,
        });
        toast.success("Leitor cadastrado com sucesso!");
        onAdd();
      }

      setNome("");
      setEmail("");
      setTelefone("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao salvar leitor");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label>Nome</Label>
      <Input value={nome} onChange={(e) => setNome(e.target.value)} />

      <Label>Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label>Telefone</Label>
      <Input
        type="tel"
        value={telefone}
        onChange={handlePhoneChange}
        placeholder="(41) 96544-3322"
        maxLength={15}
      />

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default ReaderForm;
