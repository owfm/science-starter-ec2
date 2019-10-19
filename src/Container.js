import React, { useState } from "react";
import Question from "./Question";
import ChapterFilters from "./ChapterFilters";
import uuidv1 from "uuid/v1";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  questions: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
  },
  bullets: {
    listStyleType: "none",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    marginTop: ".8rem",
    marginBottom: ".8rem",
  },
}));

const Container = ({ questions, chapters }) => {
  const classes = useStyles();
  const [filters, setFilters] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const generateQuestions = (filters = null) => {
    setQuestionsToShow(getRandomQuestions(questions, filters, 5));
  };

  return (
    <>
      <div className={classes.buttons}>
        <Button
          disabled={!filters.length}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => generateQuestions(filters)}
        >
          Generate!
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => generateQuestions()}
        >
          Lucky Dip!
        </Button>

        <Button
          onClick={() => setShowAnswers(!showAnswers)}
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          {showAnswers ? "Hide" : "Show"} Answers!
        </Button>

        <Button
          // variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={() => {
            setFilters([]);
            setQuestionsToShow([]);
          }}
        >
          Clear Chapters
        </Button>
      </div>
      <div>
        <ChapterFilters
          chapters={chapters}
          filters={filters}
          setFilters={setFilters}
        />
        {questionsToShow.length ? (
          <div className={classes.questions}>
            {questionsToShow.map((q, index) => (
              <Question
                key={uuidv1()}
                number={index}
                question={q}
                showAnswer={showAnswers}
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Container;

const getRandomQuestions = (array, filters = null, n) => {
  const filteredArray = filters
    ? array.filter(question => filters.includes(question.chapter))
    : array;

  let l = filteredArray.length;
  const returnList = [];
  const usedIds = new Set();
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * l - 1);
    if (!usedIds.has(index)) {
      usedIds.add(index);
      returnList.push(filteredArray[index]);
    } else {
      i--;
    }
  }
  return returnList;
};
