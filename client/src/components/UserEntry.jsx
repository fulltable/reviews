import React from 'react';
import '../styles/reviewStyle.css';

const UserEntry = ({ username, vip, location, reviewCount }) => {
  const initials = username.substring(0, 2);
  const speechbubble = 'https://s3-us-west-1.amazonaws.com/open-tabs-reviews/images/speechbubble.png';

  return (
    <div>
      {vip ? <span className="vip-label">VIP</span> : null}
      <span className="user-initials">{initials}</span>
      <div className="user-name">{username}</div>
      <div className="user-location">{location}</div>
      <div className="user-review-count">
        <p>
          <img src={speechbubble} alt="bubble" height="10.5" width="11" />
          {`${reviewCount} reviews`}
        </p>
      </div>
    </div>
  );
};

export default UserEntry;
