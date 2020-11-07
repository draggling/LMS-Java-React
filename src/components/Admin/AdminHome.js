"use strict"

import React from 'react';
import AdminHeader from './AdminHeader.js';
const AdminHome = () => {
        return(
            <div>
                <AdminHeader/>
                <div className="jumbotron">
                    <h1>Administrator Library Home</h1>
                </div>
            </div>

        );
}

export default AdminHome;