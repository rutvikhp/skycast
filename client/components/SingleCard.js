import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';

const SingleCard = (props) => {

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = props.data
  let d = new Date(data.time * 1000);
  const day = days[d.getDay()]
  const month = months[d.getMonth()]
  const date = d.getDate()

  const defaults = {
    icon: data.icon.toUpperCase().replace(/-/g, '_'),
    color: 'orange',
    size: 45,
    animate: true
  };

  return (
    <div>
      <div className="content">
        <div className="header" style={{color:"black"}}>{day}</div>
        <div className="meta">{month} {date}</div>
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
        <div className="header" style={{color:"black"}}>
          {data.tempHigh}<sup>&deg; </sup><span className="meta">/{data.tempLow}<sup>&deg;</sup>F</span>
        </div>
        <div className="description" style={{color:"black"}}>{data.summary}</div>
      </div>
    </div>
    )
}
export default SingleCard
