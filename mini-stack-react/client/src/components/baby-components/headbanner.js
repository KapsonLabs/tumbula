import React from "react";

// class HeadBannerComponent extends React.Component{
//     render(){
//         return(
//             <Banner/>
//         );
//     }
// }

const HeadBannerComponent = (props) => {
    return(
    <div className="row">
        <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between flex-wrap">
                <div className="d-flex align-items-end flex-wrap">
                <div className="mr-md-3 mr-xl-5">
                    <h2>{props.bannerHead}</h2>
                    <p className="mb-md-0">{props.bannerWords}</p>
                </div>
                <div className="d-flex">
                    <i className="mdi mdi-home text-muted hover-cursor"></i>
                    <p className="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Dashboard&nbsp;/&nbsp;</p>
                    <p className="text-primary mb-0 hover-cursor">Analytics</p>
                </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-wrap">
                <button type="button" className="btn btn-light bg-white btn-icon mr-3 d-none d-md-block ">
                    <i className="mdi mdi-download text-muted"></i>
                </button>
                <button type="button" className="btn btn-light bg-white btn-icon mr-3 mt-2 mt-xl-0">
                    <i className="mdi mdi-clock-outline text-muted"></i>
                </button>
                <button type="button" className="btn btn-light bg-white btn-icon mr-3 mt-2 mt-xl-0">
                    <i className="mdi mdi-plus text-muted"></i>
                </button>
                <button className="btn btn-primary mt-2 mt-xl-0">{props.headButton}</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default HeadBannerComponent;