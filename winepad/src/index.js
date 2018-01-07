import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import styles from './index.css';
import Item from './item';
import shortid from 'shortid';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			term: "",
			counter: 0,
			buttonText: "*"
		}
		this._setValue = this._setValue.bind(this);
		this._addValue = this._addValue.bind(this);
		this._removeTask = this._removeTask.bind(this);
		this._checkElement = this._checkElement.bind(this);
		this._showHowManyLeft = this._showHowManyLeft.bind(this);
		this._makeItemOperations = this._makeItemOperations.bind(this);
		this._checkAllItems = this._checkAllItems.bind(this);
	}

	_setValue(e){
		e.preventDefault();
		e.target.firstChild.value = "";
		let text = this.state.term;
		 this.state.data.push({
            text,
            done: false,
            id: this.state.counter,
            color: "black",
            textDecoration: "none"
        });
		 this.setState({
		 	data: this.state.data,
		 	term: "",
		 	counter: this.state.counter + 1
		 });
	}

	_addValue(e){
		this.setState({
			term: e.target.value
		})
	}

	_removeTask(e){
		let i = e.target.parentNode.id;
		console.log(e.target.parentNode.id);
		let array = [];
		this.state.data.map((item) => {
			if (item.id != i){
				array.push(item)
		}})
		console.log(array)
			this.setState({
			data: array
		});
	}

	_showHowManyLeft(){
		let counter = 0;
		this.state.data.map((item) => {
			if(item.done == false){
				counter++
			}
		})
		return counter
	}

	_checkElement(e){
		let i = e.target.parentNode.id;
        this.state.data.map((item) => {
        	if (item.id == i){
        		item.done = !item.done
        	}
        })
        this.setState({
			data: this.state.data
		});
		this.state.data.map((item) => {
			if (item.id == i && item.done == true){
				item.color = "lightgrey";
				item.textDecoration = "line-through";
			} else if (item.id == i && item.done == false){
				item.color = "black";
				item.textDecoration = "none";
			}
		})
    	this.setState({
			data: this.state.data
		});
	}

	_makeItemOperations(e){
		if (this.state.buttonText == "*"){
			this._checkAllItems(true);
			this.setState({
				buttonText: "^"
		})
		} else {
			this._checkAllItems(false);
			this.setState({
				buttonText: "*"
		})
		}
	}

	_checkAllItems(bool){
		let styles = {};
		bool ? styles = {color : "lightgrey", text : "line-through" } :  styles = {color : "black", text : "none" }
		this.state.data.map((item) => {
			item.done = bool;
			item.color = styles.color;
		    item.textDecoration = styles.text;
		});
		console.log(this.state);
		this.setState({
			data: this.state.data
		});
	}


	render(){
		let data = this.state.data;
		return(
		<div id="mainId">
		<h1>TODO</h1>
		<button id="all" onClick={this._makeItemOperations}>{this.state.buttonText}</button>
			<form  onSubmit={this._setValue}>
				<input type="text" id="mainInput" ref="mainInput" placeholder="What needs to be done?" onChange={this._addValue}></input>
			</form>	
			<ul ref="mainContainer" id="mainContainer">
				{data.map((item, i) => {
				return <Item  key={item.id} done={item.done} text={item.text} color={item.color} textDecoration={item.textDecoration} checkElement={this._checkElement} removeTask={this._removeTask} idx={item.id}/>
			})}
			</ul>
			<div>
			Left {this._showHowManyLeft()} items
			</div>
		</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('root'));

