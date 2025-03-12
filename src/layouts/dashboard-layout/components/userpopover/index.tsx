import React from 'react';

import { Link } from 'react-router';

import NotificationBell from '../../../../assets/icons/notification.svg';
import Logout from '../../../../assets/icons/logout.svg';
import Settings from '../../../../assets/icons/settings.svg';
import User from '../../../../assets/icons/user.svg';

import { UserBoard } from '../user-board';
import { signOut } from '../../../../helpers/helper';

const UserPopOver: React.FC = () => {
  return (
    <div className="user-account-popover">
      <div className="section-one">
        <UserBoard />
      </div>
      <div className="section-two">
        <Link to={'/dashboard/profile'}>
          <li>
            <img src={User} alt="" /> Profile
          </li>
        </Link>

        <Link to={'/dashboard/profile?tab=notifications'}>
          <li>
            <img src={NotificationBell} alt="" /> Notification
          </li>
        </Link>

        <Link to={'/dashboard/settings'}>
          <li>
            <img src={Settings} alt="" /> Settings
          </li>{' '}
        </Link>
      </div>
      <div className="section-three">
        <li onClick={(): void => signOut()}>
          <img src={Logout} alt="" /> Sign out
        </li>
      </div>
    </div>
  );
};

export default UserPopOver;
