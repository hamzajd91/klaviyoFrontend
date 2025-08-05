import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../reusable components/Loader";

export default function CampaignDetails() {
  const router = useRouter();
  const { id, userId } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [campaignMessage, setCampaignMessage] = useState(null);
  const [template, setTemplate] = useState()

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/campaign/${id}`)
        .then((res) => {
          setCampaign(res.data)
          // console.log(res.data);
          
        })
        .catch((err) => console.error("Error fetching campaign:", err));
    }
  }, [id]);

  useEffect(() => {
      
      
    if (campaign) {
      // console.log(campaign.relationships["campaign-messages"].data[0].id);
      const messageId = campaign.relationships["campaign-messages"].data[0].id;

      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/fetchCampaignMessage/${messageId}/${userId}/`);
      
       axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/klaviyo/fetchCampaignMessage/${messageId}/${userId}`
        )
        .then((res) => {
           setCampaignMessage(res.data.data);
          // console.log(res.data);
          
        })
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

const handleTemplate = () => {
  const templateId = campaignMessage?.relationships?.template?.data?.id;
  setTemplate(campaignMessage?.relationships?.template?.data?.id)
  if (!templateId) return;

  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/fetchMessageTemplate/${templateId}/${userId}`)
    .then((res) => {
      const html = res.data.data?.attributes?.html;
      if (html) {
        const newTab = window.open("", "_blank");
        if (newTab) {
          newTab.document.write(html);
          newTab.document.close();
        } else {
          alert("Pop-up blocked. Please allow pop-ups for this site.");
        }
      }
    })
    .catch((err) => console.error("Error fetching campaign message template:", err));
};


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

      {template === undefined && (
        <div style={{ color: "red", marginTop: "20px" }}>
          No HTML template available.
        </div>
      )}
  {
    template && (
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
        onClick={handleTemplate}
      >
        HTML template
      </button>
    )
  }
    </div>
  );
}
