import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';



let headers = ["Book", "Author", "Language", "Published", "Sales"];
let data = [["Lord of the rings", "J.R.R.Tolkien", "English", "1954-1955", "150 million"], ["Harry Potter", "J.K.Rowling", "English", "2011-2000", "100 million"], ["Lord of the rings 2", "J.R.R.Tolkien", "English", "1955-1956", "160 million"]]


class Exel extends Component {
	constructor(props){
		super(props);
		this.displayName = "Exel"
		this.state = {
			data: this.props.initialData
		}
		this.propTypes = {
			headers: [],
			initialData: []
		}
		this._sort = this._sort.bind(this);
	}

	_sort(e){
		let column = e.target.cellIndex;
		let data = this.state.data.slice();
		data.sort((a,b) => {
			return a[column] > b[column] ? 1 : -1;
 		})
 		this.setState({
 			data: data
 		})

	}


	render(){
			return (
			<table>
				<thead onClick={this._sort}>
					<tr>
					{this.props.headers.map(function(title, idx){
						return <th key={idx}>{title}</th>
				})}		
					</tr>
				</thead>
			<tbody>{this.state.data.map(function(row, idx){
				 return <tr key={idx}>{row.map(function(cell,idx){
					return <td key={idx}>{cell}</td>
				})}</tr>
			})}
			</tbody>	
			</table>

			)
	}
}

ReactDOM.render(<Exel headers={headers} initialData={data} />, document.getElementById('root'));



