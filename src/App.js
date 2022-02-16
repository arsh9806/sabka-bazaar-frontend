import React, { Suspense } from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Provider } from "react-redux";
import { store, persister } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundry from './components/ErrorBoundry/ErrorBoundry';

const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage/CategoriesPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage/ProductPage'));
const AuthenticationPage = React.lazy(() => import('./pages/AuthenticationPage/AuthenticationPage'));

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <div className="app">
            <Header />
            <main className="app-container">
              <Switch>
                <ErrorBoundry>
                  <Suspense fallback={<div>Loading</div>}>
                    <Route exact path="/categories" component={CategoriesPage} />
                    <Route exact path="/products/:categoryId" component={ProductPage} />
                    <Route exact path="/signin" render={() => <AuthenticationPage type="login" />} />
                    <Route exact path="/register" render={() => <AuthenticationPage type="signup" />} />
                    <Redirect to="/categories" />

                  </Suspense>
                </ErrorBoundry>
              </Switch>
            </main>
            <Footer />
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
