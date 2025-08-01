import React from "react";

const ButtonFill = (props) => {
  const { text, onClick } = props;
  return (
    <button onClick={onClick}>
      <span>{text}</span>

      <style jsx>{`
        button {
          outline: none;
          cursor: pointer;
          border: none;
          padding: 0.5rem 1.7rem;
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          position: relative;
          display: inline-block;
          letter-spacing: 0.05rem;
          font-weight: 700;
          font-size: 17px;
          border-radius: 500px;
          overflow: hidden;
          background: black;
          background: #7b070a ;
          color: ghostwhite;
          transition: 0.4s cubic-bezier(0.3, 1, 0.8, 1);
        }

        button span {
          position: relative;
          z-index: 10;
          transition: color 0.4s;
          
        }



        button:hover span {
          color: white;
        }

        button:hover {
          background: #B09344  !important;
        }

     
        
      `}</style>
    </button>
  );
};

export default ButtonFill;
