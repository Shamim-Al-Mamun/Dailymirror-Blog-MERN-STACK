import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import UserContext from "../../Context/UserContext";

function Footer() {
  const { setSubscriptions } = useContext(UserContext);
  const [subscribedEmail, setSubscribedMessage] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  //API URL
  const baseURL = process.env.React_APP_API_URL;

  const handleSubscribedEmail = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      axios
        .post(`${baseURL}/subscription`, {
          email: subscribedEmail,
        })
        .then((res) => {
          console.log(res.data);
          const data = res.data.subscribtions;
          setSubscriptions(data);
        })
        .catch((err) => {
          console.log(err);
        });
      setSubscribeMessage("Email subcribed Successfully!");
      setSubscribedMessage("");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      className="bg-light pt-3"
    >
      <div className="text-center mb-4">
        <p className="footerTitle">
          Newsletter - Stay tune and get the latest update
        </p>
        <p className="footerText">Far far away, behind the word mountains</p>
        {subscribeMessage && (
          <p className="text-success footerText">{subscribeMessage}</p>
        )}
        <form onSubmit={handleSubscribedEmail}>
          <input
            className="subsEmailInput"
            placeholder="email"
            value={subscribedEmail}
            type="email"
            onChange={(e) => setSubscribedMessage(e.target.value)}
          />
          <button className="primary-btn footer-btn" type="submit">
            Subscribe
          </button>
        </form>
      </div>
      <p className="copyRight text-muted text-center p-0 m-0">
        Copyright ©2022 All rights reserved | This template is made by{" "}
        <a
          href="https://mamun-projects.netlify.app/"
          rel="noreferrer"
          target="_blank"
          className="link-btn"
        >
          Mamun
        </a>
      </p>
    </motion.div>
  );
}

export default Footer;
