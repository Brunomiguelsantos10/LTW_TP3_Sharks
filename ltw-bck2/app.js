import fs from 'node:fs/promises';
import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();

// Configuração do multer para salvar imagens na pasta 'images'
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.static('images'));
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rota para buscar tubarões disponíveis
app.get('/sharks', async (req, res) => {
  const fileContent = await fs.readFile('./data/sharks.json');
  const sharksData = JSON.parse(fileContent);
  res.status(200).json({ sharks: sharksData });
});

// Rota para buscar tubarões do usuário
app.get('/user-sharks', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-sharks.json');
  const sharks = JSON.parse(fileContent);
  res.status(200).json({ sharks });
});

// Rota para atualizar tubarões do usuário
app.put('/user-sharks', async (req, res) => {
  const sharks = req.body.sharks;
  await fs.writeFile('./data/user-sharks.json', JSON.stringify(sharks));
  res.status(200).json({ message: 'User sharks updated!' });
});

// Rota para adicionar um novo tubarão com imagem
app.post('/sharks', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description || !req.file) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const fileContent = await fs.readFile('./data/sharks.json');
    const sharks = JSON.parse(fileContent);

    const newShark = {
      id: sharks.length + 1,
      title,
      image: { src: req.file.filename, alt: description },
    };

    sharks.push(newShark);
    await fs.writeFile('./data/sharks.json', JSON.stringify(sharks, null, 2));

    res.status(201).json({ message: 'Tubarão adicionado com sucesso!', shark: newShark });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar tubarão.' });
  }
});

// Tratamento de erro 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
