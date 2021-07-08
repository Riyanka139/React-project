import React, { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';

import MealImg from '../../assets/meals.jpg';
import './Header.css';

const Header = (props) => {
    return(
        <Fragment>
            <header className="header">
                <h1>MY FOOD</h1>
                <HeaderCartButton onClick={props.onShow}/>
            </header>
            <div className="main-image">
                <img src={MealImg} alt="A table full of delicious food!"/>
            </div>
        </Fragment>
    );
}

export default Header;