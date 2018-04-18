import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TodoList from './components/todoList.jsx';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todos: []
		}
	}

	componentWillMount() {
		axios.get('/todos')
		.then(res => {
			this.setState({
				todos: res.data
			})
		})
		.catch(err => {
			if(err) {
				throw err;
			}
		})
	}

	updateTasks() {
		axios.get('/todos')
		.then(res => {
			this.setState({
				todos: res.data
			})
		})
		.catch(err => {
			if(err) {
				alert('Error fetching tasks from server - Reload page');
			}
		})
	}

	render() {
		return(
			<div class="main">
				<h1 class="title">ToDo List:</h1>
				<TodoList todos={this.state.todos} updateTasks={this.updateTasks.bind(this)}/>
				<div id="line1"></div>
				<div id="line2"></div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));