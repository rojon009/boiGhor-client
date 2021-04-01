import React, { useEffect } from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddProduct from '../../components/AddProduct/AddProduct';
import ManageProduct from '../../components/MangeProduct/ManageProduct';

const Admin = () => {

    let { path, url } = useRouteMatch();

    return (
        <div className="row row-cols-1">
            <div className="col bg-success">
                <Link className="nav-link text-white" to="/admin/manageProduct">Manage Product</Link>
                <Link className="nav-link text-white" to={`${url}/addProduct`}>Add Product</Link>
                <Link className="nav-link text-white disabled" to="/manageProduct">Edit Product</Link>
            </div>
            <Switch>
                <Route exact path={path}>
                    <Redirect to={`${path}/manageProduct`} />
                </Route>
                <Route path={`${path}/manageProduct`}>
                    <ManageProduct />
                </Route>

                <Route path={`${path}/addProduct`}>    
                    <AddProduct />
                </Route>
            </Switch>
        </div>
    );
};

export default Admin;