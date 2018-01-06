import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import Items from './items';


export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			term: "",
			checked: []
		}
		this._setValue = this._setValue.bind(this);
		this._addValue = this._addValue.bind(this);
		this._removeTask = this._removeTask.bind(this);
		this._checkElement = this._checkElement.bind(this);
	}

	_setValue(e){
		e.preventDefault();
		e.target.firstChild.value = "";
		this.setState({
			data: [this.state.term, ...this.state.data],
			term: ""
		})
		let data = this.state.data.slice();
	}

	_addValue(e){
		this.setState({
			term: e.target.value
		})
	}

	_removeTask(e){
		let array = this.state.data;
		array.splice(e.target.parentNode.id, 1);
		this.setState({
			data: array
		})
	}

	_checkElement(e){
		console.log("aaa")
		// e.target.nextElementSibling.style.color = "lightgrey";
		// e.target.nextElementSibling.style.color = "lightgrey";
	}


	render(){
		let data = this.state.data;
		return(
		<div id="mainId">
		<h1>TODO</h1>
		<form  onSubmit={this._setValue}>
			<input type="text" id="mainInput" ref="mainInput" placeholder="What needs to be done?" onChange={this._addValue}></input>
		</form>	
		<Items initialData={data} removeTask={this._removeTask} checkElement={this._checkElement}/>
		</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

