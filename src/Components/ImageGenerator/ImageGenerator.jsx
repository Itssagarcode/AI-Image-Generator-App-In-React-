

import React, { useState, useRef } from 'react'; // Import useRef from 'react'
import './ImageGenerator.css';
import default_image from '../Assests/default_image.svg';

function ImageGenerator() {
  const [image_url, setImage_url] = useState('/');
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === '') {
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations", 
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // Replace the placeholder token with your actual OpenAI API token
          Authorization: "Bearer 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",
          "User-Agent": "Chrome"
        },
        body:JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n:1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
  }

  return (
    <div className='ai-image-generator'>
      <div className='header'>Ai image <span>Generator</span></div>
      <div className="img-loading">
        {/* Use double equals (==) for comparison */}
        <div className="image"><img src={image_url === '/' ? default_image : image_url} alt="" /></div>
      </div>
      <div className="search-box">
        <input ref={inputRef} type="text" className='search-input' placeholder='Describe what you want to see' />
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator;

