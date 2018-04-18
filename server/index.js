const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/../client'));

app.get('/todos', (req, res) => {
  db.fetchTasks((data, err) => {
    if(err) {
      res.status(500).send('Error fetching data from database');
    } else {
      res.send(data);
    }
  })
})

app.post('/todos', (req, res) => {
  db.addTask(req.body, (err) => {
  	if(err) {
  	  res.status(500).send('Error adding task, please reload page');
  	} else {
  	  res.sendStatus(200);
  	}
  })
})

app.post('/updateStatus', (req, res) => {
  db.updateTaskStatus(req.body.id, (err) => {
    if(err) {
      res.status(500).send('Database error - changes might not persist');
    } else {
      res.sendStatus(200);
    }
  })
})

app.post('/deleteTask', (req, res) => {
	db.deleteTask(req.body.id, (err) => {
		if(err) {
			res.status(500).send('Error deleteing task from database');
		} else {
			res.sendStatus(200);
		}
	})
})

app.listen(3000);