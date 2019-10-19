import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import uuidv1 from "uuid/v1";

const ChapterFilters = ({ chapters = [], setFilters, filters }) => {
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
        {chapters.sort().map(chapter => (
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
