import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Products } from './features/products/Products';

import { CartLink } from './features/cart/CartLink';
import { Cart } from './features/cart/Cart';
import styles from './App.module.css';
import { fetchToken, onMessageListener } from './firebaseNotification/firebase';
import { ToastContainer } from 'react-toastify';

///messaging

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  const onShowNotificationClicked = () => {
    setNotification({
      title: 'Notification',
      body: 'This is a test notification',
    });
    setShow(true);
  };

  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <nav>
            <Link className={styles.navLink} to='/'>
              Home
            </Link>
            <Link className={styles.navLink} to='/products'>
              Products
            </Link>
            <CartLink />
          </nav>
        </header>
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
      </div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;

function Home() {
  return (
    <main className='page'>
      <h1>Welcome to the Store</h1>
      <figure>
        <img src='/store.jpg' alt='A large old storefront' width='800' />
        <figcaption>Gary Houston, CC0, via Wikimedia Commons</figcaption>
      </figure>
    </main>
  );
}
