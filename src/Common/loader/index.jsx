// DollarLoader.js
// import React from "react";
// import "./Loader.css";

// const DollarLoader = () => {
//   const getRandomInt = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1)) + min;

//   const dollarSymbols = Array.from({ length: 100 }, (_, index) => {
//     const randomLeft = getRandomInt(0, 100);
//     const randomDuration = getRandomInt(4, 8); // Random duration between 4s and 8s
//     const randomDelay = getRandomInt(0, 2); // Random delay between 0s and 2s
//     return (
//       <div
//         className="dollar"
//         style={{
//           left: `${randomLeft}%`,
//           animationDuration: `${randomDuration}s`,
//           animationDelay: `${randomDelay}s`,
//         }}
//         key={index}>
//         $
//       </div>
//     );
//   });

//   return <div className="loader-container">{dollarSymbols}</div>;
// };

// export default DollarLoader;

import React from 'react'
import "./Loader.css";

const DollarLoader = () =>
{
  return (

    <div className="loadingio-spinner-spinner-977el9wwy2v">
      <div className="ldio-4j5ay0xf86g">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  )
}

export default DollarLoader