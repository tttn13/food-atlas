import React, { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [result, setResult] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const [reviews, setReviews] = useState({
    reviews: null,
    loading: false,
    error: null,
  });

  const fetchReviews = async(id) => {
    setReviews({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const res = await yelp.get(`/${id}/reviews`, {});
      setReviews({
        reviews: res.data.reviews,
        loading: false,
        error: null,
      });
    } catch (error) {
      setReviews({
        reviews: null,
        loading: false,
        error: "Something went wrong",
      });
    }
  }

  const searchRestaurant = async (id) => {
    setResult({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await yelp.get(`/${id}`, {});
      setResult({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setResult({
        data: null,
        loading: false,
        error: "Something went wrong",
      });
    }
  };

  return [result, searchRestaurant, reviews, fetchReviews];
};