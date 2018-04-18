import React from 'react';
import axios from 'axios';

class TodoEntry extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			status: this.props.entry.status
		}
	}

	updateStatus() {
		this.setState({
			//Number(!Boolean(this.state.status)) is to change the checkboxs ID value. 
			status: Number(!Boolean(this.state.status))
		})
		axios.post('/updateStatus', {
			id: this.props.entry.id
		})
	}

	deleteTask() {
		axios.post('/deleteTask', {
			id: this.props.entry.id
		})
		.then(() => {
			this.props.updateTasks();
		})
		.catch(err => {
			alert('Error - please reload page');
		})
	}

	render() {
		let idVal;
		this.state.status ? idVal = 'checked' : idVal = 'unchecked';
		return(
			<div class="entry">
				<div class="checkbox" onClick={this.updateStatus.bind(this)}>
					<img class="checkmark" id={idVal} src="/../src/checkmark.png"></img>
				</div>
				<div class="task" id={idVal}>
					{this.props.entry.task}
					<div class="cross" id={idVal}></div>
				</div>
				<div class="deleteButton" onClick={this.deleteTask.bind(this)}>
					<img src="/../src/deleteIcon.png" class="deleteIcon"></img>
				</div>
			</div>
		)
	}
}

export default TodoEntry;