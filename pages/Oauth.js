import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Oauth = () => {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [authentication, setauthentication] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const authentication = urlParams.get("code");
    if (state) {
      setUserId(state);
    }

    if (authentication) {
      setauthentication(authentication);
    }
  }, []);

  useEffect(() => {
    console.log(userId);
    console.log(authentication);

    if (userId && authentication) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/klaviyo/auth/callback`, {
          userId: userId,
          code: authentication,
        })
        .then((response) => {
          console.log(response.data.user);
          localStorage.removeItem("userData");
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        })
        .then((redirect) => {
          router.push("/campaigns/getCampaigns");
        })
        .catch((error) => console.error(error));
    }
  }, [userId, authentication]);

  return <div>Authenticating</div>;
};
export default Oauth;
