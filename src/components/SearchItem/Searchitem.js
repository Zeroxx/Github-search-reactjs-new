import React from 'react';
import classes from './Searchitem.module.scss';

const Searchitem=(props)=>{

    return(
        <a href={props.html_url} className={classes.Searchitem}>
            <div>
                <h2>{props.name}</h2>
                <p>Language: {props.language} </p>
                <p>Score: {props.score} </p>
                <p>Stars: {props.stars}</p>
                <p>Updated_At: {props.updated_at} </p>
                <p>Created_At: {props.created_at} </p>
            </div>
        </a>
    )
} 

export default Searchitem;