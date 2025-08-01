import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../reusable components/Loader";

export default function CampaignDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [campaignMessage, setCampaignMessage] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/klaviyo/campaign/${id}`)
        .then((res) => setCampaign(res.data))
        .catch((err) => console.error("Error fetching campaign:", err));
    }
  }, [id]);

  useEffect(() => {
    if (campaign?.relationships?.["campaign-messages"]?.data?.[0]?.id) {
      const messageId = campaign.relationships["campaign-messages"].data[0].id;

      axios
        .get(
          `http://localhost:5000/api/klaviyo/fetchCampaignMessage/${messageId}`
        )
        .then((res) => setCampaignMessage(res.data.data))
        .catch((err) => console.error("Error fetching campaign message:", err));
    }
  }, [campaign]);

  if (!campaign) {
    return (
      <div className="loaderContainer">
        <Loader />
      </div>
    );
  }

  const attributes = campaign.attributes || {};
  const message = campaignMessage?.attributes?.definition?.content || {};
  const sender = campaignMessage?.attributes?.definition || {};
  const sendTime = campaignMessage?.attributes?.send_times?.[0]?.datetime;

  return (
    <div className="campaign-container">
      <h1 className="campaign-title">{attributes.name}</h1>

      <div className="campaign-info">
        <p>
          <strong>Status:</strong> {attributes.status}
        </p>
        <p>
          <strong>Archived:</strong> {attributes.archived ? "Yes" : "No"}
        </p>
        <p>
          <strong>Send Time:</strong>{" "}
          {new Date(attributes.send_time).toLocaleString()}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(attributes.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {new Date(attributes.updated_at).toLocaleString()}
        </p>
        <p>
          <strong>Send Strategy:</strong> {attributes.send_strategy?.method}
        </p>
      </div>

      {campaignMessage && (
        <div className="message-section">
          <h2>Message Content</h2>
          <p>
            <strong>Subject:</strong> {message.subject}
          </p>
          <p>
            <strong>Preview:</strong> {message.preview_text}
          </p>
          <p>
            <strong>From:</strong> {message.from_label} ({message.from_email})
          </p>
          <p>
            <strong>Channel:</strong> {sender.channel}
          </p>
          <p>
            <strong>Scheduled Send:</strong>{" "}
            {new Date(sendTime).toLocaleString()}
          </p>
        </div>
      )}

      <button
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          marginTop: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        HTML template
      </button>
    </div>
  );
}
