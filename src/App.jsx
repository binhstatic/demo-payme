import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Products } from './features/products/Products';
import { CartLink } from './features/cart/CartLink';
import { Cart } from './features/cart/Cart';
import styles from './App.module.css';
import { getFirebaseToken, onForegroundMessage } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';

///messaging

function App() {
  const [showNotificationBanner, setShowNotificationBanner] = useState(
    Notification.permission === 'default'
  );

  console.log(Notification.permission);

  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log('Received foreground message: ', payload);
        const {
          notification: { title, body },
        } = payload;
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch((err) =>
        console.log(
          'An error occured while retrieving foreground message. ',
          err
        )
      );
  }, []);

  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          setShowNotificationBanner(false);
        }
      })
      .catch((err) =>
        console.error('An error occured while retrieving firebase token. ', err)
      );
  };

  const ToastifyNotification = ({ title, body }) => (
    <div className='push-notification'>
      <h2 className='push-notification-title'>{title}</h2>
      <p className='push-notification-text'>{body}</p>
    </div>
  );

  return (
    <Router>
      {showNotificationBanner && (
        <div className='notification-banner'>
          <span>The app needs permission to</span>
          <a
            href='#'
            className='notification-banner-link'
            onClick={handleGetFirebaseToken}
          >
            enable push notifications.
          </a>
        </div>
      )}

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
      <button
        className='btn-primary'
        onClick={() =>
          toast(<ToastifyNotification title='New Message' body='Hi there!' />)
        }
      >
        Show toast notification
      </button>
    </Router>
  );
}

export default App;
