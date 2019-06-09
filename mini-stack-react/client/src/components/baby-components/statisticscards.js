import React from "react";

class StatisticsCardComponent extends React.Component{
    render(){
        return <>
            <StatsCards/>
        </>
    }
}

const StatsCards = () =>
    <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body dashboard-tabs p-0">
            <ul className="nav nav-tabs px-4" role="tablist">
                <li className="nav-item">
                <a className="nav-link active" id="overview-tab" data-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" id="sales-tab" data-toggle="tab" href="#sales" role="tab" aria-controls="sales" aria-selected="false">Stores</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" id="purchases-tab" data-toggle="tab" href="#purchases" role="tab" aria-controls="purchases" aria-selected="false">Transaction Volume</a>
                </li>
            </ul>
            <div className="tab-content py-0 px-0">
                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                <div className="d-flex flex-wrap justify-content-xl-between">
                    <div className="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-calendar-heart icon-lg mr-3 text-primary"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Start date</small>
                        <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium" href="#" role="button" id="dropdownMenuLinkA" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h5 className="mb-0 d-inline-block">26 Jul 2018</h5>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
                            <a className="dropdown-item" href="#">12 Aug 2018</a>
                            <a className="dropdown-item" href="#">22 Sep 2018</a>
                            <a className="dropdown-item" href="#">21 Oct 2018</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-currency-usd mr-3 icon-lg text-danger"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Revenue</small>
                        <h5 className="mr-2 mb-0">$577545</h5>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-eye mr-3 icon-lg text-success"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Total Stores</small>
                        <h5 className="mr-2 mb-0">9833550</h5>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-download mr-3 icon-lg text-warning"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Transactions</small>
                        <h5 className="mr-2 mb-0">2233783</h5>
                    </div>
                    </div>
                    <div className="d-flex py-3 border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-flag mr-3 icon-lg text-danger"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Flagged Transactions</small>
                        <h5 className="mr-2 mb-0">3497843</h5>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="sales" role="tabpanel" aria-labelledby="sales-tab">
                <div className="d-flex flex-wrap justify-content-xl-between">
                    <div className="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-calendar-heart icon-lg mr-3 text-primary"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Start date</small>
                        <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium" href="#" role="button" id="dropdownMenuLinkA" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h5 className="mb-0 d-inline-block">26 Jul 2018</h5>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
                            <a className="dropdown-item" href="#">12 Aug 2018</a>
                            <a className="dropdown-item" href="#">22 Sep 2018</a>
                            <a className="dropdown-item" href="#">21 Oct 2018</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-download mr-3 icon-lg text-warning"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Downloads</small>
                        <h5 className="mr-2 mb-0">2233783</h5>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-eye mr-3 icon-lg text-success"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Total views</small>
                        <h5 className="mr-2 mb-0">9833550</h5>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-currency-usd mr-3 icon-lg text-danger"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Revenue</small>
                        <h5 className="mr-2 mb-0">$577545</h5>
                    </div>
                    </div>
                    <div className="d-flex py-3 border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-flag mr-3 icon-lg text-danger"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Flagged</small>
                        <h5 className="mr-2 mb-0">3497843</h5>
                    </div>
                    </div>
                </div>
                </div>
                <div className="tab-pane fade" id="purchases" role="tabpanel" aria-labelledby="purchases-tab">
                <div className="d-flex flex-wrap justify-content-xl-between">
                    <div className="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-calendar-heart icon-lg mr-3 text-primary"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Start date</small>
                        <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium" href="#" role="button" id="dropdownMenuLinkA" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h5 className="mb-0 d-inline-block">26 Jul 2018</h5>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
                            <a className="dropdown-item" href="#">12 Aug 2018</a>
                            <a className="dropdown-item" href="#">22 Sep 2018</a>
                            <a className="dropdown-item" href="#">21 Oct 2018</a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-currency-usd mr-3 icon-lg text-danger"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Revenue</small>
                        <h5 className="mr-2 mb-0">$577545</h5>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-eye mr-3 icon-lg text-success"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Total views</small>
                        <h5 className="mr-2 mb-0">9833550</h5>
                    </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-download mr-3 icon-lg text-warning"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Downloads</small>
                        <h5 className="mr-2 mb-0">2233783</h5>
                    </div>
                    </div>
                    <div className="d-flex py-3 border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                    <i className="mdi mdi-flag mr-3 icon-lg text-danger"></i>
                    <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">Flagged</small>
                        <h5 className="mr-2 mb-0">3497843</h5>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>;

export default StatisticsCardComponent;