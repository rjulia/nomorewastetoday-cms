import React from 'react';

const Infocard = ({ title, data, info, icon }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card card-stats">
        <div className="card-body">
          <div className="row">
            <div className="col-5 col-md-4">
              <div className="icon-big text-center icon-warning">
                <i className={`nc-icon ${icon} text-warning`}></i>
              </div>
            </div>
            <div className="col-7 col-md-8">
              <div className="numbers">
                <p className="card-category">{title}</p>
                <p className="card-title">{data} </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer ">
          <hr />
          <div className="stats">
            <i className="fa fa-refresh"></i> {info}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infocard;
