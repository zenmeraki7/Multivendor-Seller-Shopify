import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/baseUrl";
import ShopNotFound from "../components/ShopNotFound";

const AuthRoutes = ({ component }) => {
  const { shop } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(shop);

  useEffect(() => {
    const checkShopExist = async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/vendor/authenticate-shop`,
          { shop }
        );
        console.log(response.data);
        setError(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    checkShopExist();
  }, []);

  return !loading ? error ? <ShopNotFound /> : component : "Loading....";
};

export default AuthRoutes;
