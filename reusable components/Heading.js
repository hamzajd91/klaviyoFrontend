import React from "react";

const Heading = (props) => {
  return (
    <h2>
      {props.content}

      <style jsx>{`
        h2 {
          text-align: left;
          margin-left: 10px;
        }
      `}</style>
    </h2>
  );
};

export default Heading;
