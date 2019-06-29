import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SideComponent extends React.Component {
    render() {
      return <>
      <Sidebar/>
      </>;
    }
  }

const Sidebar = () => 
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
    <ul className="nav">
        <li className="nav-item">
            <Link className="nav-link" to="/admin">
                <i className="mdi mdi-home menu-icon"></i>
                <span className="menu-title">Dashboard</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/adminmanager">
                <i className="mdi mdi-account-star menu-icon"></i>
                <span className="menu-title">Admin Manager</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/stores">
                <i className="mdi mdi-circle-outline menu-icon"></i>
                <span className="menu-title">Store Manager</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/appmanager">
                <i className="mdi mdi-view-headline menu-icon"></i>
                <span className="menu-title">Application Monitor</span>
            </Link>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="pages/charts/chartjs.html">
            <i className="mdi mdi-chart-pie menu-icon"></i>
            <span className="menu-title">Configurations</span>
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="pages/tables/basic-table.html">
            <i className="mdi mdi-grid-large menu-icon"></i>
            <span className="menu-title">Admin Details</span>
            </a>
        </li>
    </ul>
    </nav>;

export default SideComponent;