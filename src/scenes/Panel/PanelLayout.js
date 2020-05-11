import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Sidebar, Navbar, ModalImages } from '../../components';
import NavbarProvaider from '../../components/Navbar/Navbar-provaider';
import PanelClients from './PanelClients';
import PanelHome from './PanelHome';
import PanelClient from './PanelClient';
import PanelLinks from './PanelLinks';
import PanelLink from './PanelLink';
import PanelLocations from './PanelLocations';
import PanelLocation from './PanelLocation';
import PanelEvents from './PanelEvents';
import PanelEvent from './PanelEvent';
import PanelShops from './PanelShops';
import PanelShop from './PanelShop';
import PanelAdvices from './PanelAdvices';
import PanelAdvice from './PanelAdvice';
import PanelProducts from './PanelProducts';
import PanelProduct from './PanelProduct';
import PanelSubscribers from './PanelSubscribers';

const PanelLayout = ({ session }) => {
  return (
    <NavbarProvaider>
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="content">
            <div className="row">
              <Switch>
                <Route path="/panel/home" component={PanelHome} />
                <Route path="/panel/clients" component={PanelClients} />
                <Route
                  path="/panel/links"
                  render={(props) => <PanelLinks {...props} session={session} />}
                />
                <Route
                  path="/panel/link/:id"
                  render={(props) => <PanelLink {...props} session={session} />}
                />
                <Route
                  path="/panel/link"
                  render={(props) => <PanelLink {...props} session={session} />}
                />
                <Route
                  path="/panel/locations"
                  render={(props) => <PanelLocations {...props} session={session} />}
                />
                <Route
                  path="/panel/location/:id"
                  render={(props) => <PanelLocation {...props} session={session} />}
                />
                <Route
                  path="/panel/location"
                  render={(props) => <PanelLocation {...props} session={session} />}
                />
                <Route
                  path="/panel/events"
                  render={(props) => <PanelEvents {...props} session={session} />}
                />
                <Route
                  path="/panel/event/:id"
                  render={(props) => <PanelEvent {...props} session={session} />}
                />
                <Route
                  path="/panel/event"
                  render={(props) => <PanelEvent {...props} session={session} />}
                />
                <Route
                  path="/panel/shops"
                  render={(props) => <PanelShops {...props} session={session} />}
                />
                <Route
                  path="/panel/shop/:id"
                  render={(props) => <PanelShop {...props} session={session} />}
                />
                <Route
                  path="/panel/shop"
                  render={(props) => <PanelShop {...props} session={session} />}
                />
                <Route
                  path="/panel/client/:id"
                  render={(props) => <PanelClient {...props} session={session} />}
                />
                <Route
                  path="/panel/client"
                  render={(props) => <PanelClient {...props} session={session} />}
                />
                <Route
                  path="/panel/advices"
                  render={(props) => <PanelAdvices {...props} session={session} />}
                />
                <Route
                  path="/panel/advice/:id"
                  render={(props) => <PanelAdvice {...props} session={session} />}
                />
                <Route
                  path="/panel/advice"
                  render={(props) => <PanelAdvice {...props} session={session} />}
                />
                <Route
                  path="/panel/products"
                  render={(props) => <PanelProducts {...props} session={session} />}
                />
                <Route
                  path="/panel/product/:id"
                  render={(props) => <PanelProduct {...props} session={session} />}
                />
                <Route
                  path="/panel/product"
                  render={(props) => <PanelProduct {...props} session={session} />}
                />
                <Route
                  path="/panel/subscribers"
                  render={(props) => <PanelSubscribers {...props} session={session} />}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <ModalImages />
    </NavbarProvaider>
  );
};

export default PanelLayout;
