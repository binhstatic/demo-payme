import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactNotificationComponent = ({ title, body }: any): any => {};

ReactNotificationComponent.defaultProps = {
  title: 'This is title',
  body: 'Some body',
};

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default ReactNotificationComponent;
