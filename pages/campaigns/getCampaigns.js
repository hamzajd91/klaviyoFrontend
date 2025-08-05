import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import Loader from "../../reusable components/Loader";

const ITEMS_PER_PAGE = 12;

export default function CampaignsPage() {
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [fetchedOnce, setFetchedOnce] = useState(false);

  const router = useRouter();

  // Get userId once on mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const parsedUser = JSON.parse(storedData);
        if (parsedUser?._id) {
          setUserId(parsedUser._id);
          // console.log("User ID set:", parsedUser);

          if (!parsedUser?.klaviyo) {
            axios
              .post(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/saveMatrixKey`, {
                userId: parsedUser._id,
              })
              .then(() => {
                // console.log("Matrix key saved");
              })
              .catch((err) => {
                console.error("Error saving matrix key:", err?.message || err);
              });
          }
        } else {
          console.warn("User ID not found in localStorage data");
        }
      } else {
        console.warn("No userData found in localStorage");
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, []);

  // Fetch paginated data
  const fetchPage = async (pageNum = 1) => {
    if (!userId) {
      console.warn("Cannot fetch page — userId is missing");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/klaviyo/paginated`,
        { params: { userId, page: pageNum, limit: ITEMS_PER_PAGE } }
      );

      if (res?.data) {
        setItems(res.data.items || []);
        setPageInfo({
          page: res.data.page || 1,
          totalPages: res.data.totalPages || 0,
        });
        setFetchedOnce(true);
      } else {
        console.warn("No data returned from campaigns API");
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPage(1);
    }
  }, [userId]);

  const handleFetchClick = async () => {
    if (!userId) {
      console.warn("Cannot fetch campaigns — userId is missing");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/klaviyo/fetch-campaign-data`,
        { userId }
      );
      await fetchPage(1);
    } catch (err) {
      console.error("Error fetching campaign data:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = ({ selected }) => {
    fetchPage(selected + 1);
  };

  const handleCampaignClick = (campaign) => {
    if (!campaign?.id) {
      console.warn("Campaign ID missing — cannot navigate to details");
      return;
    }
    router.push(`/campaigns/campaignDetails?id=${campaign.id}&userId=${userId}`);
  };

  return (
    <>
      <Head>
        <title>Campaigns</title>
      </Head>

      <div className="d-flex">
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
            <button
              className="p-3 btn btn-sm btn-outline-success mt-2"
              onClick={() => {
                try {
                  localStorage.removeItem("userData");
                  router.push(`/`);
                } catch (err) {
                  console.error("Error logging out:", err?.message || err);
                }
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

          {loading && (
            <div className="loaderContainer">
              <Loader />
            </div>
          )}

          {!loading && !fetchedOnce && (
            <div className="text-center my-5">
              <button className="btn btn-primary" onClick={handleFetchClick}>
                Fetch Campaigns
              </button>
            </div>
          )}

          {!loading && fetchedOnce && items.length > 0 && (
            <>
              <div className="mb-4">
                <div className="text-end small text-muted mt-1">
                  Page {pageInfo.page} of {pageInfo.totalPages}
                </div>
              </div>

              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {items.map((c) => (
                  <div
                    key={c.id || Math.random()}
                    className="col"
                    onClick={() => handleCampaignClick(c)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="ad-card">
                      <div className="ad-media">
                        <img
                          src="https://placehold.co/300x400"
                          className="img-fluid"
                          alt={c.attributes?.name || "Campaign"}
                        />
                        <span>{c.attributes?.status || "Unknown"}</span>
                      </div>
                      <div className="p-2">
                        <div className="card-title">
                          {c.attributes?.name || "No Name"}
                        </div>
                        <div className="ad-metrics">
                          Status: {c.attributes?.status || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <ReactPaginate
                  pageCount={pageInfo.totalPages}
                  onPageChange={handlePageClick}
                  forcePage={(pageInfo.page || 1) - 1}
                  previousLabel="‹ Prev"
                  nextLabel="Next ›"
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  activeClassName="active"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
