import React from "react";

class CardsComponent extends React.Component{
    render(){
        return <>
            <Cards/>
        </>;
    }
}

const Cards = () =>
    <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <p className="card-title">Cash deposits</p>
                    <p className="mb-4">To start a blog, think of a topic about and first brainstorm party is ways to write details</p>
                    <div id="cash-deposits-chart-legend" className="d-flex justify-content-center pt-3"></div>
                <canvas id="cash-deposits-chart"></canvas>
                </div>
            </div>
        </div>
        <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <p className="card-title">Total sales</p>
                    <h1>$ 28835</h1>
                    <h4>Gross sales over the years</h4>
                    <p className="text-muted">Today, many people rely on computers to do homework, work, and create or store useful information. Therefore, it is important </p>
                    <div id="total-sales-chart-legend"></div>                  
                </div>
                <canvas id="total-sales-chart"></canvas>
            </div>
        </div>
    </div>;

export default CardsComponent;