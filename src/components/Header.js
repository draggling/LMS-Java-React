'use strict';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AiFillHome } from 'react-icons/ai';


const Header = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);
	return (
		<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<ul className="list-inline">
					<li className="list-inline-item">
						<Link to="/" replace>
							<AiFillHome color = "#95ABBA" />
						</Link>
					</li> &nbsp;
					<li className="list-inline-item">
						<Link to="/LibrarianBranch" replace>
							Librarian
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="/Borrower" replace>
							Borrower
						</Link>
					</li>
					<li className="list-inline-item">
					<Dropdown className="header-dropdown" isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle
						caret
						tag="span"
						data-toggle="dropdown"
						aria-expanded={dropdownOpen}>
						Administrator
						</DropdownToggle>
						<DropdownMenu>
						<DropdownItem tag={Link} to="/AdminHome">Home</DropdownItem>
							<DropdownItem divider />
							<DropdownItem tag={Link} to="/AdminAuthor">Authors</DropdownItem>
							<DropdownItem tag={Link} to="/AdminBook">Books</DropdownItem>
							<DropdownItem tag={Link} to="/AdminBorrower">Borrowers</DropdownItem>
							<DropdownItem tag={Link} to="/AdminBranch">	Branches</DropdownItem>
							<DropdownItem tag={Link} to="/AdminGenre">Genres</DropdownItem>
							<DropdownItem tag={Link} to="/AdminPublisher">Publishers</DropdownItem>
							<DropdownItem divider/>
							<DropdownItem tag={Link} to="/AdminLoan">Loaned Books</DropdownItem>
							<DropdownItem> </DropdownItem>
						</DropdownMenu>
					</Dropdown>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
