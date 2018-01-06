import React from 'react';
import {Component} from 'react';


export default class Fancylink extends Component{
	constructor(props){
		super(props);
	}

	render(){
		 console.log(this.props); 
		 return (
		 	<div>{this.props.children}</div>); 
	}
}


