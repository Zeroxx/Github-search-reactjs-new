import React, {Component} from 'react';
import classes from './FilterBtn.module.scss';


class FilterBtn extends Component {

    render(){

        let activeFilter = '';
        if (this.props.crntFilter === this.props.languageName || this.props.crntFilter === 'C%2B%2B' && this.props.languageName === 'C++'){
             activeFilter = classes.active;
             console.log('test');
        }


        return(
        <div className={classes.filterButton}>
            <button className={activeFilter} onClick={this.props.filtering}>{this.props.languageName}</button>
        </div>
        );
    }
};

export default FilterBtn;
