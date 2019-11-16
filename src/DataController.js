import React, { useState, useEffect } from "react";
import Container from "./Container";
import Axios from "axios";
import LoadingIcon from "./LoadingIcon";

const DataController = () => {
  const [questions, setQuestions] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "https://k18vythvo2.execute-api.eu-west-2.amazonaws.com/dev/questions",
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        setQuestions([...response.data.data]);
        setChapters([...new Set(response.data.data.map(item => item.chapter))]);
      } catch (error) {
        setError("Couldn't fetch questions, sorry!");
      }
    };
    fetchData();
  }, []);
  if (!questions || !chapters)
    return <LoadingIcon type={"spin"} color={"palevioletred"} />;
  if (error) return <p>{error}</p>;

  return <Container questions={questions} chapters={chapters} />;
};

export default DataController;
