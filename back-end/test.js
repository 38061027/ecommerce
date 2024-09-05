import express from "express";
import mysql from "mysql2";
import cors from "cors";
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "38061027",
  database: "cursos",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

app.get("/api/data", (req, res) => {
  connection.query("SELECT * FROM alunos", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post("/api/data", (req, res) => {
  const { nome, idade, tec } = req.body;
  const query = "INSERT INTO alunos (nome, idade, tec) VALUES (?, ?, ?)";
  connection.query(query, [nome, idade, tec], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ nome, idade, tec });
    }
  });
});

app.put("/api/data/:id", (req, res) => {
  const id = req.params.id;
  const { nome, idade, tec } = req.body;
  const query = "UPDATE alunos SET nome = ?, idade = ?, tec = ? WHERE id = ?";
  connection.query(query, [nome, idade, tec, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({ nome, idade, tec , id });
    }
  });
});

app.delete("/api/data/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM alunos WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({});
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
