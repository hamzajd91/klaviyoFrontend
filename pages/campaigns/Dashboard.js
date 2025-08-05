
import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../../reusable components/Loader";


export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser?._id) {
      setUserId(storedUser._id);
      // console.log("User ID set:", storedUser);
    }

    if(storedUser.klaviyo.accessToken){
      router.push("/campaigns/getCampaigns");
    }
  }, []);




  const handleConnect = () => {
if (userId) {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/auth/${userId}`, {
               
            })
            .then((response) => {
                // console.log(response.data.url);
                window.location.href = response.data.url;
            })
            .catch((error) => {
                console.error("API error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="d-flex w-100 container-fluid" style={{width:"100w"}}>
      
        {/* Sidebar */}
        <div className="sidebar">
          <h5 className="mb-4 fw-bold">TIG</h5>
          <a href="#">Home</a>
          <a href="#">Settings</a>
          <a href="#">Refer and earn</a>
          <a href="#">Create board</a>
          <hr />
          <h6 className="text-muted text-uppercase small">Boards</h6>
          <a href="#">Starter board</a>
          <a className="active" href="#">
            Top Ads - Women
          </a>
          <a href="#">Top Ads - Men</a>
          <div className="mt-5">
            <div className="p-3">
              <br />
              <button className="btn btn-sm btn-outline-success mt-2">
                Start free trial
              </button>
            </div>
          </div>
          <div className="mt-5">
            {/* <br /> */}
            <button
              className="p-3 btn btn-sm btn-outline-success mt-2"
              onClick={() => {
                // setItems();
                localStorage.removeItem("userData");
                router.push(`/`);
              }}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="main-content w-100">
          {/* Header and filters */}
          <nav className="mb-3 small text-muted">
            Home / Starter board / <strong>Top Ads - Women</strong>
          </nav>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2 className="fw-semibold">Top Ads - Women</h2>
              <p className="text-muted">
                The "Top Ads" report highlights your highest-spending ads with
                key performance metrics like CTR, Thumbspot ratio and ROAS.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-success">● Published</span>
              <button className="btn btn-outline-secondary btn-sm">
                Ask AI
              </button>
            </div>
          </div>
          <div className="d-flex gap-2 flex-wrap align-items-center mb-3">
            <select className="form-select w-auto">
              <option selected>Account: HERA</option>
            </select>
            <input
              type="text"
              className="form-control w-auto"
              value="7 - 13 Jul, 2025"
              readOnly
            />
            <input
              type="text"
              className="form-control w-auto"
              value="Campaign name is a I, TIG | ASC | Women"
              readOnly
            />
            <button className="btn btn-outline-secondary btn-sm">
              + Add filter
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              + Add breakdown
            </button>
          </div>
          <div className="d-flex gap-2 flex-wrap mb-4">
            <span className="metric-badge green">Impressions</span>
            <span className="metric-badge blue">Clicks</span>
            <span className="metric-badge yellow">
              CTR (Click Through Rate)
            </span>
            <button className="btn btn-outline-secondary btn-sm">
              + Add metric
            </button>
          </div>

          <div className="d-flex gap-2 flex-wrap mb-4">
            <span className="metric-badge green">Impressions</span>
            <span className="metric-badge blue">Clicks</span>
            <span className="metric-badge yellow">CTR</span>
            <button className="btn btn-outline-secondary btn-sm">
              + Add metric
            </button>
          </div>

          {loading && (
            <div className="loaderContainer">
              <Loader />
            </div>
          )}


        <button
            style={{
                width: "300px",
                height: "48px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                border: "2px solid #0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                margin: "24px 0"
            }}
            onClick={handleConnect}
        >
            Connect OAuth
        </button>
          
        </div>
      </div>
    </>
  );
}

