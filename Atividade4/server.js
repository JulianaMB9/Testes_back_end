import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware para processar URL-encoded e JSON no corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Armazenamento simples na memória para usuários
let users = [
  { email: "usuario@gmail.com", password: "123456", name: "Usuario" },
];

// Armazenamento simples na memória para sessões
let sessions = {}; // { email: true }

// Rota para processar o login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(400).send("E-mail ou senha incorretos");
  }

  // Armazenar a sessão
  sessions[email] = true;
  res.send(`Bem-vindo de volta, ${user.name}!`);
});

// Rota para retornar informações do perfil do usuário autenticado
app.get("/profile", (req, res) => {
  const { email } = req.query;

  // Verificar se o usuário está autenticado
  if (!sessions[email]) {
    return res.status(401).send("Usuário não autenticado");
  }

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).send("Usuário não encontrado");
  }

  // Retornar apenas nome, email e senha
  res.json({
    name: user.name,
    email: user.email,
    password: user.password,
  });
});

if (process.argv[1].endsWith("server.js")) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
