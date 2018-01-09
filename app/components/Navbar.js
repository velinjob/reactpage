import React from 'react';
import PropTypes from 'prop-types';
import HandleAuthPanel from '../containers/HandleAuthPanel';
import {NavLink} from 'react-router-dom';

const Navbar = ({pages}) => (
    <nav className="navbar navbar-default">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar">{}</span>
                    <span className="icon-bar">{}</span>
                    <span className="icon-bar">{}</span>
                </button>
                <NavLink className="navbar-brand" to="/">Template</NavLink>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    { 
                        pages.map(page=>{
                            return <li key={page.id}><NavLink to={page.url} activeClassName="active">{page.name}</NavLink></li>
                        })
                    }
                </ul>

                <HandleAuthPanel />

            </div>
        </div>
    </nav>
);

export default Navbar;