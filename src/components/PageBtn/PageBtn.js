import React from 'react';
import classes from './PageBtn.module.scss';

const pageBtn = (props) => (

    <ul>
        <button className={[classes.navButton, classes.prevPage].join(' ')} onClick={props.prevPage} disabled={props.activeBtn}>Prev page</button>
        <button className={[classes.navButton, classes.nextPage].join(' ')} onClick={props.nextPage}>Next page</button>
    </ul>
);

export default pageBtn;