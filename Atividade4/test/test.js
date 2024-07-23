import request from "supertest";
import { expect } from "chai";
import request from "supertest";
import app from "../server.js";

describe("Rotas de Autenticação e Perfil", () => {
  let userCredentials = { email: "usuario@gmail.com", password: "123456" };

  before((done) => {
    // Setup: garantir que o usuário está na base de dados
    request(app)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  describe("POST /login", () => {
    it("deve retornar a mensagem de boas-vindas para credenciais válidas", (done) => {
      request(app)
        .post("/login")
        .send(userCredentials)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Bem-vindo de volta, Usuario!");
          done();
        });
    });

    it("deve retornar credenciais inválidas", (done) => {
      request(app)
        .post("/login")
        .send({ email: "usuario@gmail.com", password: "wrongpassword" })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("E-mail ou senha incorretos");
          done();
        });
    });
  });

  describe("GET /profile", () => {
    it("deve retornar informações do perfil do usuário após login bem-sucedido", (done) => {
      request(app)
        .get("/profile")
        .query({ email: userCredentials.email })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.deep.equal({
            name: "Usuario",
            email: "usuario@gmail.com",
            password: "123456",
          });
          done();
        });
    });

    it("não deve retornar informações do perfil do usuário para login inválido", (done) => {
      request(app)
        .get("/profile")
        .query({ email: "usuari@gmail.com" })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Usuário não autenticado");
          done();
        });
    });
  });
});
