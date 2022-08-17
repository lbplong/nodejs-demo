/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckIn from "../../API/Module/CheckIn";
import ListMovie from "./Contents/ListMovie/ListMovie";
import "./homeStyle.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const _checkIn = async () => {
    const checkInResult = await CheckIn.checkIn();
    if (checkInResult.isAxiosError) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    _checkIn();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  }

  return <ListMovie />;
}
