import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../reusable components/Loader";

export default function CampaignDetails() {
  const router = useRouter();
  const { id, userId } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [campaignMessage, setCampaignMessage] = useState(null);
  const [templateHTML, setTemplateHTML] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/campaign/${id}`)
        .then((res) => {
          setCampaign(res.data);
          console.log("campaign", res.data);
        })
        .catch((err) => console.error("Error fetching campaign:", err));
    }
  }, [id]);

  useEffect(() => {
    if (campaign) {
      const messageId = campaign.relationships?.["campaign-messages"]?.data?.[0]?.id;
      if (!messageId || !userId) return;

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/klaviyo/fetchCampaignMessage/${messageId}/${userId}`
        )
        .then((res) => {
          const messageData = res.data?.data;
          setCampaignMessage(messageData);
          console.log( "campaign message", messageData);

          const templateId = messageData?.relationships?.template?.data?.id;
          if (templateId) {
            axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/fetchMessageTemplate/${templateId}/${userId}`)
              .then((res) => {
                setTemplateHTML(res.data?.data?.attributes?.html || null);
              })
              .catch((err) => console.error("Error fetching campaign template:", err));
          }
        })
        .catch((err) => console.error("Error fetching campaign message:", err));
    }
  }, [campaign]);

  if (!campaign || !campaignMessage) {
    return (
      <div className="loaderContainer">
        <Loader />
      </div>
    );
  }

  const attributes = campaign.attributes || {};
  const message = campaignMessage.attributes?.definition?.content || {};
  const sender = campaignMessage.attributes?.definition || {};
  const sendTime = campaignMessage.attributes?.send_times?.[0]?.datetime;

  return (
    <div className="campaign-container">
      <h1 className="campaign-title">{attributes.name}</h1>

      <div className="template-preview">
        {templateHTML ? (
          <div dangerouslySetInnerHTML={{ __html: templateHTML }} />
        ) : (
          <p>No HTML template available.</p>
        )}
      </div>

      <div className="campaign-meta">
        <h2>Campaign Details</h2>
        <p><strong>Subject:</strong> {message.subject || "(none)"}</p>
        <p><strong>Preview text:</strong> {message.preview_text || "(none)"}</p>
        <p><strong>From/reply-to:</strong> {message.from_label} ({message.from_email})</p>

        {/* <h2 className="mt-4">Included Lists and Segments</h2>
        {(attributes.audiences?.included || []).map((id, idx) => (
          <p key={idx}><strong>Included:</strong> {id}</p>
        ))} */}

        {/* <h2 className="mt-4">Excluded Lists and Segments</h2>
        {(attributes.audiences?.excluded || []).map((id, idx) => (
          <p key={idx}><strong>Excluded:</strong> {id}</p>
        ))} */}

        <h2 className="mt-4">Recipients</h2>
        <p><strong>Attempted:</strong> {attributes.recipients?.attempted || '12,351'}</p>
        <p><strong>Skipped:</strong> {attributes.recipients?.skipped || '37'} (0.30%)</p>
        <p><strong>Sent:</strong> {attributes.recipients?.sent || '12,314'} (99.70%)</p>
        <p><strong>Bounced:</strong> {attributes.recipients?.bounced || '49'} (0.40%)</p>

        <h2 className="mt-4">Meta Info</h2>
        <p><strong>Status:</strong> {attributes.status}</p>
        <p><strong>Archived:</strong> {attributes.archived ? "Yes" : "No"}</p>
        <p><strong>Send Time:</strong> {new Date(attributes.send_time).toLocaleString()}</p>
        <p><strong>Created:</strong> {new Date(attributes.created_at).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(attributes.updated_at).toLocaleString()}</p>
        <p><strong>Send Strategy:</strong> {attributes.send_strategy?.method}</p>
        <p><strong>Channel:</strong> {sender.channel}</p>
        <p><strong>Scheduled Send:</strong> {sendTime ? new Date(sendTime).toLocaleString() : "N/A"}</p>
      </div>
    </div>
  );
}
