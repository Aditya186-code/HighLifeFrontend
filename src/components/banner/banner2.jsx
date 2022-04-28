import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React from 'react'
import './banner.css'
import { sliderItems } from './data';
import { useState } from 'react';
const Banner = () => {

  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  }
  let translating_factor = slideIndex * -100;
  return (
    <div className = "bannerContainer">
      <div className="arrowContainer left" onClick={() => handleClick("left")}>
      <ArrowLeftOutlined />
      </div>
      <div className = "bannerWrapper" style = {{transform : `translateX(${translating_factor}vw)`}}  slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <div className = "slideContainer" style = {{backgroundColor : `#${item.bg}`}} key={item.id}>
            <div className = "bannerImgContainer">
              <img className = "bannerImg" src={item.img} />
            </div>
            <div className = "bannerInfoContainer">
              <h1 className = "bannerH1">{item.title}</h1>
              <p className = "bannerDesc">{item.desc}</p>
              <button className = "bannerButton">SHOW NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div className = "arrowContainer right" onClick={() => handleClick("right")}>

      <ArrowRightOutlined />

      </div>

    </div>
  )
}

export default Banner