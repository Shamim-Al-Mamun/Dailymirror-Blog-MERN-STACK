const Timestamp = (time) => {
  const timestamp = new Date().getTime();
  return Math.floor((timestamp - time) / 60000) <= 0
    ? "just now"
    : Math.floor((timestamp - time) / 60000) < 59
    ? Math.floor((timestamp - time) / 60000) + "m ago"
    : Math.floor((timestamp - time) / 3600000) < 23
    ? Math.floor((timestamp - time) / 3600000) + "h ago"
    : Math.floor((timestamp - time) / 86400000) < 30
    ? Math.floor((timestamp - time) / 86400000) + "days ago"
    : Math.floor((timestamp - time) / 2592000000) < 12
    ? Math.floor((timestamp - time) / 2592000000) + "months ago"
    : Math.floor((timestamp - time) / 31104000000) + "years ago";
};

export default Timestamp;
