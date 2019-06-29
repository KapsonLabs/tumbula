import React from "react";

class Page extends React.Component {
    render() {
      return <>
      {/* <Nav/> */}
      <Jumbotron/>
      <div className="container pt-4">
        <Toys/>
        <hr/>
      </div>
      </>;
    }
  }
  
//   const Nav = () =>
//       <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
//         <div className="container">
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
//                   aria-controls="navbarNavAltMarkup"
//                   aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//             <div className="navbar-nav">
//               <a className="nav-item nav-link" href="#home">Home
//                 <span className="sr-only">(current)</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>;
  
  
  const Jumbotron = () =>
      <div className="jumbotron jumbotron-fluid bg-info text-white">
        <div className="container text-sm-center pt-5">
          <h1 className="display-2">Vumbula Toys</h1>
          <p className="lead">Your one stop toys shop</p>
          <div className="btn-group mt-4" role="group" aria-label="Callout Buttons">
            <button type="button" className="btn btn-primary btn-lg">Order Now</button>
          </div>
        </div>
      </div>;
  
  const Toys = () =>
      <>
      <h1 id="toys" className="display-4 my-4 text-center text-muted">Toys</h1>
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/1.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy One</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/2.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Two</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/3.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Three</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/4.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Four</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/5.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Five</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/6.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Six</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/7.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Seven</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card mb-3">
            <img className="card-img-top" src="img/8.png"/>
            <div className="card-body">
              <h4 className="card-title text-center">Toy Eight</h4>
              <p className="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
      </div>
      </>;

export default Page;