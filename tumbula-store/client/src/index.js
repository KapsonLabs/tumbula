import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

//template css files
import './components/static/vendors/mdi/css/materialdesignicons.min.css';
import './components/static/vendors/base/vendor.bundle.base.css';
import './components/static/vendors/datatables.net-bs4/dataTables.bootstrap4.css';
import './index.css';
import './components/static/css/style.css';

//script imports
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';

//template vendor imports
// import './components/static/vendors/base/vendor.bundle.base';
// import './components/static/vendors/chart.js/Chart.min.js';
// import './components/static/vendors/datatables.net/jquery.dataTables';
// import './components/static/vendors/datatables.net-bs4/dataTables.bootstrap4';

//template javascript file imports
// import './components/static/js/chart';

// import './components/static/js/off-canvas';
// import './components/static/js/hoverable-collapse';
// import './components/static/js/template';

// import './components/static/js/dashboard';
// import './components/static/js/data-table';
// import './components/static/js/jquery.dataTables';
// import './components/static/js/dataTables.bootstrap4';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
