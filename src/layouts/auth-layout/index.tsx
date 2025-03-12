import React from 'react';
import './style.css';
import { Layoutprops } from './models';
import { Link } from 'react-router';

import Logo from 'assets/images/logo.svg';
import Mail from 'assets/icons/mail.svg';
import OnboardingImg from 'assets/images/auth-img.png';
import OnboardingSecondaryImg from 'assets/images/auth-img-two.png';

import { ToastContainer } from 'react-toastify';

const AuthLayout: React.FC<Layoutprops> = ({
  children,
  showSecondaryImage,
}) => {
  const getFullYear = new Date().getFullYear();

  return (
    <div className="auth-layout">
      <div className="auth-layout__form_container">
        <div className="header">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="children-container">{children}</div>
        <div className="footer">
          <p>© Source ID {getFullYear}</p>
          <button>
            <img src={Mail} alt="Mail" className="mr-2" /> Support
          </button>
        </div>
      </div>

      <div className="auth-layout__info">
        <h1>
          AI-Powered Solutions Driving <br /> Seamless Onboarding, Verification,
          <br /> and Revenue Across the Globe.
        </h1>

        <img
          src={!showSecondaryImage ? OnboardingImg : OnboardingSecondaryImg}
          alt=""
        />
      </div>

      <ToastContainer autoClose={false} />
    </div>
  );
};

export default AuthLayout;
