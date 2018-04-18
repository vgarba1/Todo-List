import React from 'react';
import TodoEntry from './todoEntry.jsx';
import axios from 'axios';

class TodoList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			todos: props.todos
		}
	} 

	componentWillReceiveProps(nextProps) {
		this.setState({
			todos: nextProps.todos
		})
	}

	addTask() {
		let newTask = window.prompt('Add new task to ToDo list: ');
		if(newTask.split('').length > 0) {
			axios.post('/todos', {
				task: newTask
			})
			.then(res => {
				this.props.updateTasks();
			})
			.catch(err => {
				alert('Server error - Reload page');
			})
		}
	}	

	render() {
		let todoTasks = this.state.todos.map((each, index) => {
			return <TodoEntry entry={each} key={index} updateTasks={this.props.updateTasks}/>
		})
		return(
			<div class="taskList">
				<div class="addButton" onClick={this.addTask.bind(this)}>+</div>
				<div class="hr1"></div>
				{todoTasks}
			</div>
		)
	}
}

export default TodoList;