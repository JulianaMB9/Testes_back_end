const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware para processar JSON no corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));

// Armazenamento simples na memória para usuários
let users = [];

// Rota para a página de cadastro
app.get("/", (req, res) => {
  res.send(`
        <form action="/cadastro" method="POST">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required><br>
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required><br>
            <label for="confirmPassword">Confirmação de Senha:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required><br>
            <button type="submit">Cadastrar</button>
        </form>
    `);
});

// Rota para processar o cadastro
app.post("/", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Verificação se as senhas coincidem
  if (password !== confirmPassword) {
    return res.status(400).send("As senhas não coincidem");
  }

  // Verificação se o e-mail já está cadastrado
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).send("Este e-mail já está cadastrado");
  }

  // Adiciona o novo usuário à lista de usuários
  users.push({ name, email, password });
  res.redirect(`/boas-vindas?name=${encodeURIComponent(name)}`);
});

// Rota para a página de boas-vindas
app.get("/boas-vindas", (req, res) => {
  const name = req.query.name;
  res.send(`Bem-vindo, ${name}!`);
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
