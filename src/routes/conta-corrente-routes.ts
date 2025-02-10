import express, { Request, Response } from "express";
import ContaCorrente from "../classes/conta-corrente";

const contaCorrenteRoutes = express.Router();

const contas: ContaCorrente[] = [
  new ContaCorrente(
    1234,
    1,
    "Cezar Augusto",
    "1234123421",
    new Date("1990-07-12"),
    new Date()
  ),
];

// GET /:id -> Retornar a conta corrente pelo id
contaCorrenteRoutes.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({ error: "Id da conta inválido" });
    return;
  }

  const conta = contas.find((c) => c.id === id);
  if (!conta) {
    res.status(404).send({ error: "Conta não encontrada" });
    return;
  }
  const {
    id: idConta,
    agencia,
    numero,
    nomeCliente,
    cpf,
    dataNascimento,
    dataCriacao,
    saldo,
  } = conta;

  res.send({
    id: idConta,
    agencia,
    numero,
    nome_cliente: nomeCliente,
    cpf,
    data_nascimento: dataNascimento,
    data_criacao: dataCriacao,
    saldo,
  });
});



// POST /authn  -> Autenticar - criar a chave de acesso temporário
// autenticação, autenticação com JWT
contaCorrenteRoutes.post("/authn", (req: Request, res: Response) => {
  //recuperar do body o usuario e senha e depois gera um token e devolve para o usuario
  const { id, password } = req.body;

  //valida  a existência de um usuário com o cpf e senha informados
  const conta = contas.find((c) => c.cpf === id && c.senha === password);
  if (!conta) {
    res.status(404).send({ error: "Conta ou senha inválidos" });
    return;
  }

})
// POST / -> Criar


// GET /:agencia/:numero

// GET /:agencia/:numero/sado

// PATCH /saldo

// DELETE /

export { contaCorrenteRoutes };
