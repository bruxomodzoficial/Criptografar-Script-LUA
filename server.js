import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Servir arquivos estáticos (index.html)
app.use(express.static("."));

app.get("/outfit", async (req, res) => {
  const nome = req.query.username;
  try {
    // Buscar ID pelo nome
    const busca = await fetch(`https://api.imvu.com/user/search?q=${nome}`);
    const resultadoBusca = await busca.json();

    if (!resultadoBusca || resultadoBusca.length === 0) {
      return res.json({ erro: "Usuário não encontrado" });
    }

    const userId = resultadoBusca[0].legacy_cid;

    // Buscar outfit pelo ID
    const resposta = await fetch(`https://api.imvu.com/user/user-${userId}/outfits`);
    const dados = await resposta.json();

    res.json(dados);
  } catch (e) {
    res.json({ erro: "Erro ao buscar dados" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});