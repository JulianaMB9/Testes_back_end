const { expect } = require("chai");
const request = require("supertest");
const app = require("../server");

describe("Testes de Login", function () {
  it("Deve aceitar credenciais corretas", function (done) {
    request(app)
      .post("/login")
      .send({ username: "usuario_correto", password: "senha_correta" })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.text).to.include("Login successful");
        done();
      });
  });

  it("Deve rejeitar credenciais incorretas", function (done) {
    request(app)
      .post("/login")
      .send({ username: "usuario_incorreto", password: "senha_incorreta" })
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.text).to.include("Invalid credentials");
        done();
      });
  });
});
