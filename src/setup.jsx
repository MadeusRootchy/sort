import React, { useEffect, useState } from 'react';
import database from './database.json';
import { useParams } from 'react-router-dom';

const Redirection = () => {
  const { shortUrl } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const matchedUrl = database.shortUrls.find((entry) => entry.shortUrl === shortUrl);
    console.log("Matched URL from database:", matchedUrl);
    if (matchedUrl) {
      window.location.href = matchedUrl.originalUrl;
    } else {
      console.error("Short URL not found");
    }

    setLoading(false);
  }, [shortUrl]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Redirecting...</p>}
    </div>
  );
};

export default Redirection;
