import React, { useState } from 'react';
import database from './database.json';
import { Link } from 'react-router-dom';

const INITIAL_STATE = { url: '' };

const UrlForm = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [dbState, setDbState] = useState(database);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const generateNextShortString = () => {
    const lastEntry = dbState.shortUrls[dbState.shortUrls.length - 1];
    if (lastEntry) {
      const lastId = lastEntry.id;
      const newId = parseInt(lastId, 36) + 1;
      return newId.toString(36);
    }
    return 'a';
  };

  const generateShortUrl = () => {
    return generateNextShortString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newShortUrl = generateShortUrl();
    const originalUrl = form.url;

    const newDatabase = {
      ...dbState,
      shortUrls: [
        ...dbState.shortUrls,
        {
          id: newShortUrl,
          shortUrl: newShortUrl,
          originalUrl: originalUrl,
        },
      ],
    };

    setDbState(newDatabase);
    setShortenedUrl(newShortUrl);
    setForm(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="url">Url</label>
        <input id="url" type="text" value={form.url} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
      {shortenedUrl && (
        <div>
          <p>Shortened URL: {shortenedUrl}</p>
          <p>
            Click to test: <Link to={`/r/${shortenedUrl}`}> {`/r/${shortenedUrl}`}</Link>
          </p>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
