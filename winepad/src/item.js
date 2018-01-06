import React, {Component} from 'react';
import styles from './index.css';


export default class Item extends Component {
	constructor(props){
		super(props);
		this.state = {
			isChecked: false
		}
		this._checkElement = this._checkElement.bind(this);
	}

	_checkElement(e){
		console.log(e.target.nextElementSibling)
		if(this.state.isChecked == "true"){
			e.target.nextElementSibling.className = "checked"
		} else {
			e.target.nextElementSibling.className = "unchecked"
		}
		this.setState({
     		 isChecked: !this.state.isChecked,
    	});
    	this.props.checkElement();
	}

	render(){
		return (
			<div id={this.props.idx}>
				<input className="box" type="checkbox" checked={this.state.isChecked} onChange={this._checkElement}></input>
				<li className="li">{this.props.text}</li>
				<div className="rm" type="button" onClick={this.props.removeTask}>REMOVE</div>
			</div>
			)
	}
}

