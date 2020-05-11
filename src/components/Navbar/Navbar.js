import React, { useEffect, useState } from 'react';
import CloseSession from '../../auth/CloseSession';
import useNabvar from './use-navbar-context';
import axios from 'axios';

const Navbar = () => {
  const { toggleMenu, getImages } = useNabvar();
  const [data, setData] = useState(null);
  const url = 'http://res.cloudinary.com/nitroclik/image/list/waste.json';

  useEffect(() => {
    let source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        setData(response.data.resources);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('AxiosCancel: caught cancel');
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      console.log('AxiosCancel: unmunting');
      source.cancel();
    };
  }, [url]);

  getImages(data);

  return (
    <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-toggle"></div>
          <p className="navbar-brand">CMS NITROCLIK NO MORE WASTE</p>
        </div>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
              <div className="nav-link btn-magnify">
                <i className="nc-icon nc-image"></i>
                <p>
                  <span className="d-lg-none d-md-block">IMAGES</span>
                </p>
              </div>
            </li>
            <li className="nav-item">
              <CloseSession model={'nobutton'} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
