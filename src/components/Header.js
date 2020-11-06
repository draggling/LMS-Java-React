"use strict"

import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <Link to="/" className="navbar-brand">
                                <img width="90px" height="30px" src="images/logo.png" />
                            </Link>
                        </li>
                        <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                        <li className="list-inline-item"><Link to="/books" replace>Books</Link></li>
                        <li className="list-inline-item"><Link to="/" replace>Librarian_Home</Link></li>
                        <li className="list-inline-item"><Link to="/" replace>Borrower_Home</Link></li>
                        <li className="list-inline-item"><Link to="/AdminHome" replace>Administrator_Home</Link></li>

                    </ul>
                </div>
            </nav>
        );
}

export default Header;
