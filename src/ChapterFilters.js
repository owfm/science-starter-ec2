import React, { useState, useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import uuidv1 from "uuid/v1";

const ChapterFilters = ({ chapters = [], setFilters, filters, visible }) => {
  if (!visible) return null;

  const handleChange = name => event => {
    if (filters.includes(name)) {
      setFilters(filters.filter(f => f !== name));
    } else {
      setFilters([...filters, name]);
    }
  };

  return (
    <>
      <FormGroup row>
        {chapters.sort(sortChaptersFn).map(chapter => (
          <FormControlLabel
            key={uuidv1()}
            control={
              <Checkbox
                checked={filters.includes(chapter)}
                onChange={handleChange(chapter)}
                value={chapter}
              />
            }
            label={chapter}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default ChapterFilters;

const sortChaptersFn = (a, b) => {
  // sorts chapters alphabetically and using chapter numbers.
  // Need this otherwise Chapter 10 comes before Chapter 2.
  if (a[0] < b[0]) return -1;

  if (a[0] === b[0]) {
    return (
      parseInt(a.match(/\d/g).join("")) - parseInt(b.match(/\d/g).join(""))
    );
  }
};
