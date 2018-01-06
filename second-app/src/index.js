import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';

let headers = [  "Book", "Author", "Language", "Published", "Sales" ];
let data = [  ["The Lord of the Rings", "J. R. R. Tolkien",    "English", "1954–1955", "150 million"],  ["Le Petit Prince (The Little Prince)", "Antoine de      Saint-Exupéry",    "French", "1943", "140 million"],  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling",    "English", "1997", "107 million"],  ["And Then There Were None", "Agatha Christie",    "English", "1939", "100 million"],  ["Dream of the Red Chamber", "Cao Xueqin",    "Chinese", "1754–1791", "100 million"],  ["The Hobbit", "J. R. R. Tolkien",    "English", "1937", "100 million"],  ["She: A History of Adventure", "H. Rider Haggard",    "English", "1887", "100 million"], ];


class Exel extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: this.props.initialData,
			sortby: null,    
			descending: false,
			edit: null,
			search: false
		}
		this.propTypes = {
			headers: [],
			initialData: []
		}
		this._presearchData = null;
		this._sort = this._sort.bind(this);
		this._search = this._search.bind(this);
		this._showEditor = this._showEditor.bind(this);
		this._save = this._save.bind(this);
		this._renderTable = this._renderTable.bind(this);
		this._renderToolbar = this._renderToolbar.bind(this);
		this._renderSearch= this._renderSearch.bind(this);
		this._toggleSearch= this._toggleSearch.bind(this);
		}

	_sort(e){
		let column = e.target.cellIndex;
		let descending = this.state.sortby === column && !this.state.descending;
		let data = this.state.data.slice();
		data.sort(function(a, b) {  
			return descending ? (a[column] < b[column] ? 1 : -1)    
			: (a[column] > b[column] ? 1 : -1); }); 
		this.setState({
			 data: data, 
			 sortby: column,  
			 descending: descending 
		})
	}

	_showEditor(e){
		this.setState({
			edit: {
				row: parseInt(e.target.dataset.row, 10),
				cell: e.target.cellIndex
			}
		})
	}

	_save(e){
		e.preventDefault();
		let input = e.target.firstChild;
		let data = this.state.data.slice();
		data[this.state.edit.row][this.state.edit.cell] = input.value;
		this.setState({ 
			edit: null, 
			data: data
		});
	}

	_renderTable(){
		let state = this.state;
		return (
			<table>
				<thead onClick={this._sort}>
					<tr>
						{this.props.headers.map((title, i) => {
							if (state.sortby === i){
								 title += this.state.descending ? ' \u2191' : ' \u2193' 
							}
							return <th key={i}>{title}</th>
						})}
					</tr>
				</thead>
				<tbody onDoubleClick={this._showEditor}>
					{this._renderSearch()}
					{state.data.map((row, rowi) => {
						return <tr key={rowi}>{row.map((cell,i) => {
							let content = cell;
							let edit = state.edit;
							if (edit && edit.row === rowi && edit.cell === i) {  
								content = (<form onSubmit={this._save}>
										<input type="text" defaultValue={content}></input>
									</form>)
							} 
							return <td key={i} data-row={rowi}>{content}</td>
						})}</tr>
					})}
				</tbody>
			</table>
			)
	}

	_renderToolbar(){
		return (
			<button className="toolbar" onClick={this._toggleSearch}>SEARCH</button>
		)
	
	}

	_renderSearch(){
		 if (!this.state.search){
		 	return null
		 } 
		 return (
		 	<tr onChange={this._search}>{
		 		this.props.headers.map((_ignore, idx) => {
		 			return (
		 				<td key={idx}>
		 					<input type="text" data-idx={idx}></input>
		 				</td>
		 				)
		 		})
		 	}
		 	</tr>
		 )
	}

	_toggleSearch(){
		if (this.state.search){
			this.setState({
				data: this._presearchData,
				search: false
			})
			this._presearchData = null;
		} else {
			this._presearchData = this.state.data;
			this.setState({
				search: true
			})
		}
	}

	_search(e){
		let preSearchData = this._presearchData;
		console.log(preSearchData);
		let needle = e.target.value.toLowerCase(); 
		if (!needle) { 
		   this.setState({data: preSearchData});
		   return;  
		}
		let idx = e.target.dataset.idx; 
		let searchdata = preSearchData.filter((row) => {
			return row[idx].toString().toLowerCase().indexOf(needle) > -1;  
		}); 
		 this.setState({data: searchdata}); 
	}
	
	render(){
		let state = this.state;
		return (
			<div>
			{this._renderTable()}
			{this._renderToolbar()}
			</div>
			)
	}}

ReactDOM.render(<Exel headers={headers} initialData={data}/>, document.getElementById('root'));




