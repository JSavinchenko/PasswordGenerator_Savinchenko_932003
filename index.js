const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Парсинг тела запроса в формате JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Загрузка файла index.html
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Ошибка сервера');
    }
    res.send(data);
  });
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});