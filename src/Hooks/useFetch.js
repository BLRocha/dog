import React from 'react';

export const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(false);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (!response.ok) throw new Error(json.message);
    } catch(err) {
      json = null;
      setError(err.message);
    } finally {
      setLoading(false);
      setData(json);
      return {response, json};
    }
  }, []);

  return {
    data,
    loading,
    error,
    request
  }
}
