import React, { Component } from 'react';
import axios from 'axios';
import {Route , Switch} from 'react-router-dom';

import './App.scss';
import SearchOverview from './containers/Searchoverview';
import PageBtn from './components/PageBtn/PageBtn';
import FilterBtn from './components/FilterBtn/FilterBtn';
import SortSelect from './components/SortSelect/SortSelect';

class App extends Component {
  constructor(){
    super();
    this.state={
      searchQuery:'',
      searchResults:[],
      activeFilter: '',
      searchFilter: '',
      searchSorting: '',
      showResults:false,
      pageNumber: 1,
      prevBtn: true
    }
  }

  search = () =>{
    axios.get(`https://api.github.com/search/repositories?&q=${this.state.searchQuery}${this.state.searchFilter}&sort=${this.state.searchSorting}&page=${this.state.pageNumber}&per_page=30`)
    .then((results)=>{
      console.log(results.headers.link);
      this.setState({
        searchResults:results.data,
        showResults:true
      })
    })
  }

  handleChange=(searchInput)=>{
    this.setState({
      searchQuery:searchInput.target.value
    })
  }
  
  handleSorting=(searchSorting)=>{
    this.setState(
      {searchSorting: searchSorting.target.value},
      this.search
    )
  }

  handleFilter=(filterLanguage)=>{

    this.setState(
      {searchFilter:'+language:' + filterLanguage,
      activeFilter: filterLanguage},
    this.search
   )
  }

  handleNextPage = () => {
    const oldPage = this.state.pageNumber;
    const newPage = oldPage +1;
    this.setState(
      {pageNumber: newPage,
      prevBtn: false },
      this.search,
      console.log('currentpage ' + this.state.pageNumber)
      )
  }

  handlePrevPage = () => {
    const oldPage = this.state.pageNumber;
    const newPage = oldPage - 1;
    if (oldPage <= 2){
      this.setState({pageNumber: newPage, prevBtn: true},this.search)
    return;
    }
    this.setState(
      {pageNumber: newPage, prevBtn: false},
      this.search,
    console.log('currentpage ' + this.state.pageNumber)
    )
  }

  handleClick=()=>{
    this.setState({pageNumber: 1});
    this.search();
  }

  render(){
    let searchoverview = null;
    let pagebuttons = null;
    if (this.state.showResults){
      searchoverview = <SearchOverview searchResults={this.state.searchResults} />
      pagebuttons = <PageBtn nextPage={this.handleNextPage} prevPage={this.handlePrevPage} activeBtn={this.state.prevBtn} />
    }

    return(
      <div className="App">
        <input type='text' className="searchInput"
         value={this.state.searchQuery}
         onChange={(searchInput)=>this.handleChange(searchInput)} />
        <button className="searchBtn" onClick={this.handleClick}>Search</button>
        
        <SortSelect 
        sorting={(searchSorting)=>this.handleSorting(searchSorting)}
        bstMatch={''}
        star={'stars'}
        />

        <div className="filterblock">
          <p>Filter on languages</p>
          <FilterBtn crntFilter={this.state.activeFilter} filtering={()=>this.handleFilter('Java')} languageName='Java'/>
          <FilterBtn crntFilter={this.state.activeFilter} filtering={()=>this.handleFilter('Javascript')} languageName='Javascript'/>
          <FilterBtn crntFilter={this.state.activeFilter} filtering={()=>this.handleFilter('HTML')} languageName='HTML'/>
          <FilterBtn crntFilter={this.state.activeFilter} filtering={()=>this.handleFilter('C%2B%2B')} languageName='C++'/>
          <FilterBtn crntFilter={this.state.activeFilter} filtering={()=>this.handleFilter('Python')} languageName='Python'/>
        </div>
        {searchoverview}
        {pagebuttons}  
      </div>
    );
  }
}

export default App;