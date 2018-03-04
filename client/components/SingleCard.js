import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';

const SingleCard = () => {
  const defaults = {
    icon: 'CLEAR_DAY',
    color: 'orange',
    size: 45,
    animate: true
  };
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">Today</div>
        <div className="meta">March 4</div>
      </div>
      <div>
        <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="content">
        <div className="header">
          63<sup>&deg; </sup><span className="meta">/45<sup>&deg;</sup>F</span>
        </div>
        <div className="description">clear sky</div>
      </div>
      {/* <div className="extra content">
        <a>
          <i aria-hidden="true" className="user icon"></i>16 Friends</a>
        </div> */}
      </div>
    )
}
export default SingleCard
