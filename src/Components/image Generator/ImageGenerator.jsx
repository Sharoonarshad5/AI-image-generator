import React, {useRef, useState } from 'react'
import './ImageGenerator.css'
import  default_image from'../Assets/default_image.svg'

const ImageGenerator = () => {

  const [image_url,setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading ,setloading]=useState(false);   

  const generateImage = async ()=>{
    if(inputRef.current.value ===""){
      return 0;
    }
    setloading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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","User-Agent": "Chrome"
        },
        body: JSON.stringify({
          prompt:`${inputRef.current.value}`,
          n: 1,
          size: "256x256",
        }),
      }
    );
    let data =await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setloading(false);

  }

  return (
    <div className='Ai-image-generator'>
      <div className="header">Ai image <span>generator</span>
      </div>
      <div className="img_loading">
        <div className="image">
            <img src={image_url==="/"?default_image:image_url} />
            </div>
            <div className="loading">
              <div className={loading?"loading-bar-full":"loading_bar"}>
                <div className={loading?"loading_Text":"display-none"}>Loading.....</div>
              </div>
            </div>
      </div>
      <div className="search_box">
        <input type="text" ref={inputRef} className="search-input" placeholder='Describe what You Want To See' />
        <button className='generate-btn' onClick={()=>{
          generateImage();
        }}>Generate</button>
      </div>
    </div>
  )
}

export default ImageGenerator
