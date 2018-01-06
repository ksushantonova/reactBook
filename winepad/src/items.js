import React, {Component} from 'react';
import styles from './index.css';
import Item from './item.js'


export default class Items extends Component {
	constructor(props){
		super(props);
		this.state = {
			key: "",
			isChecked: false
		}
	}



	render(){
		let data = this.props.initialData;
		return (
			data ? (
				<div>
					<ul> { data.map((item, i) => {
					 return (
					 	<Item key={i} idx={i} text={item} removeTask={this.props.removeTask} checkElement={this.props.checkElement}/>
					 	)
						})} 
					</ul>
				</div>
				) : null
			)
	}
}

