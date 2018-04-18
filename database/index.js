const fs = require('fs');

const fetchTasks = (cb) => {
  fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
    if(err) {
  	  cb(null, err);
    } else {
      let parsedData = JSON.parse(data);
      cb(Object.values(parsedData.todos));
	}
  })
}

const updateTaskStatus = (id, cb) => {
  fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
    if(err) {
      cb(err);
    } else {
      let parsedData = JSON.parse(data);
      parsedData.todos[id].status = Number(!Boolean(parsedData.todos[id].status)); //To switch status between 0 and 1
      fs.writeFile(__dirname + '/data.json', JSON.stringify(parsedData), (err) => {
        if(err) {
	      cb(err);
        } else {
          cb(null);
        }
      })
    }
  })
}

const addTask = (task, cb) => {
  fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
    if(err) {
      cb(err)
    } else { 
      let parsedData = JSON.parse(data);
      task.status = 0;
      task.id = parsedData.idCount;
      parsedData.todos[parsedData.idCount] = task;
      parsedData.idCount = parsedData.idCount + 1;
      fs.writeFile(__dirname + '/data.json', JSON.stringify(parsedData), (data, err) => {
        if(err) {
          cb(err)
        } else {
          cb(null)
        }
      })
    }
  })
}

const deleteTask = (id, cb) => {
	fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
		if(err) {
			cb(err)
		} else {
			let parsedData = JSON.parse(data);
			delete parsedData.todos[id];
			fs.writeFile(__dirname + '/data.json', JSON.stringify(parsedData), (data, err) => {
				if(err) {
					cb(err)
				} else {
					cb(null)
				}
			})
		}
	})
}



module.exports = {
	fetchTasks,
	updateTaskStatus,
	addTask,
	deleteTask
}

