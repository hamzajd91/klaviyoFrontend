import React from "react";

const DashboardCard = (props) => {
  const { title, value } = props;
  return (
    <div>
      <div className="card">
        <p className="time-text">
          <span>{value?value:"Value"}</span>
          {/* <span className="time-sub-text">PM</span> */}
        </p>
        <p className="day-text">{title?title:"Title"}</p>
        
      </div>

      <style jsx>{`
        .card {
          width: 230px;
          height: 130px;
          background: rgb(17, 4, 134);
          background: var(--primary-color);
          border-radius: 15px;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px;
          display: flex;
          color: white;
          justify-content: center;
          position: relative;
          flex-direction: column;
          
          transition: all 0.3s ease-in-out;
          overflow: hidden;
        }

        .card:hover {
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }

        .time-text {
          font-size: 40px;
          margin-top: 0px;
          margin-left: 15px;
          font-weight: 500;
          font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        }

        .time-sub-text {
          font-size: 15px;
          margin-left: 5px;
        }

        .day-text {
          font-size: 20px;
          margin-top: 0px;
          margin-left: 15px;
          font-weight: 500;
          font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        }

       
      `}</style>
    </div>
  );
};

export default DashboardCard;
