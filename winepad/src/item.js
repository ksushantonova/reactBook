import React, {Component} from 'react';
import styles from './index.css';


export default class Item extends Component {
	constructor(props){
		super(props);
		this.state = {
			isChecked: this.props.done,
		}
	}

	componentDidMount(){
		this.setState({
			idx: this.props.idx
		})
	}

	render(){
		console.log(this.props.done)
		return (
			<div id={this.state.idx}>
				<input   className="box" type="checkbox" checked={this.props.done} onChange={this.props.checkElement}></input>
				<li className="li" style={{color: this.props.color, textDecoration: this.props.textDecoration}}>{this.props.text}</li>
				<div className="rm" type="button" onClick={this.props.removeTask}>REMOVE</div>
			</div>
			)
	}
}

