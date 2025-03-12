import React, { useEffect } from 'react';
import './style.css';

import UserImage from '../../../../assets/icons/admin-icon.svg';
import { selectProfile } from 'store/profile-details/profile-tab/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/index';
import { fetchProfileRequest } from 'store/profile-details/profile-tab/actions';
import { CLOUDFRONT_URL } from '../../../../setup/config/apiConfig';

const UserBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const profile = useSelector(selectProfile);
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);
  return (
    <div className="user-board">
      <div className="user-image">
        <img
          src={
            profile?.staff?.photo &&
            typeof profile.staff.photo === 'string' &&
            profile.staff.photo.trim() !== ''
              ? `${CLOUDFRONT_URL}/${profile.staff.photo}`
              : UserImage
          }
          alt="User Profile"
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="status online" />
      </div>

      <div className="user-info">
        <h3 className="capitalize">
          {`${profile?.staff.firstName ?? ''} ${profile?.staff.lastName ?? ''}`.trim()}
        </h3>
        <p>{String(profile?.staff?.email || '')}</p>
      </div>
    </div>
  );
};

const MinifiedUserBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const profile = useSelector(selectProfile);
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);
  return (
    <div className="user-board minified">
      <div className="user-image">
        <img
          src={
            profile?.staff?.photo &&
            typeof profile.staff.photo === 'string' &&
            profile.staff.photo.trim() !== ''
              ? `${CLOUDFRONT_URL}/${profile.staff.photo}`
              : UserImage
          }
          alt="User Profile"
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="status online" />
      </div>
    </div>
  );
};

const OnlineStatus: React.FC = () => {
  return (
    <div className="status-board">
      <div className="status-circle online"></div>
      <p>Online</p>
    </div>
  );
};

export { UserBoard, OnlineStatus, MinifiedUserBoard };
