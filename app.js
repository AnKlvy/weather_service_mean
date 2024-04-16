const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const cors = require("cors");

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Создаем объект локального хранилища для эмуляции localStorage в Node.js
const localStorage = new LocalStorage('./scratch');

// Обработчик для получения прогноза погоды и добавления заметки
app.post('/api/addWeather', async (req, res) => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        hourly: 'temperature_2m'
      }
    });

    // Получение текущих данных из localStorage (если они там есть)
    const existingData = JSON.parse(localStorage.getItem('weatherDataWithNotes')) || [];

    // Добавление новых данных к существующим
    const newData = { weather: response.data, note: req.body.note };
    existingData.push(newData);

    // Обновление данных в localStorage
    localStorage.setItem('weatherDataWithNotes', JSON.stringify(existingData));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обработчик для получения данных о погоде и заметке
app.get('/api/getWeatherData', (req, res) => {
  const data = JSON.parse(localStorage.getItem('weatherDataWithNotes')) || [];
  res.status(200).json(data);
});

// Обработчик для изменения заметки
app.put('/api/updateNote/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const data = JSON.parse(localStorage.getItem('weatherDataWithNotes')) || [];

  if (index >= 0 && index < data.length) {
    data[index].note = req.body.note;

    // Обновление данных в localStorage
    localStorage.setItem('weatherDataWithNotes', JSON.stringify(data));

    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: 'Index not found' });
  }
});

// Обработчик для удаления данных о погоде и заметке
app.delete('/api/deleteWeather/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  let data = JSON.parse(localStorage.getItem('weatherDataWithNotes')) || [];

  if (index >= 0 && index < data.length) {
    data = data.filter((_, i) => i !== index);

    // Обновление данных в localStorage
    localStorage.setItem('weatherDataWithNotes', JSON.stringify(data));

    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: 'Index not found' });
  }
});

// Обработчик для поиска по заметкам
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q.toLowerCase();
  console.log(searchTerm);
  const data = JSON.parse(localStorage.getItem('weatherDataWithNotes')) || [];

  const searchResults = data.filter(item => {
    // Поиск в заметке и координатах (если необходимо)
    const noteMatch = item.note.toLowerCase().includes(searchTerm);
    // Добавь дополнительные поля для поиска, если необходимо

    return noteMatch;
  });

  res.status(200).json(searchResults);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
