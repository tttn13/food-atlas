import React, { useState } from "react";
import yelp from "../api/yelp";
import { REACT_APP_YELP_API_KEY } from "@env"

export default (initialTerm = "Burger") => {
  const [results, setResults] = useState({
    data: null,
    region: null,
    loading: false,
    error: null,
  });
  const searchRestaurants = async (searchTerm) => {
    setResults({
      data: null,
      region: null,
      loading: true,
      error: null,
    });
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 15,
          term: searchTerm,
          location: "San Francisco",
        },
      });
      setResults({
        data: response.data.businesses,
        region: response.data.region,
        loading: false,
        error: null,
      });
      
    } catch (error) {
      setResults({
        data: null,
        region: null,
        loading: false,
        error: "Something went wrong",
      });
    }
  };

  return [results, searchRestaurants];
};