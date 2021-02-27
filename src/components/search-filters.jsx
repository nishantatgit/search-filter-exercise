import { RadioButton, Checkbox, Box } from "gestalt";
import { useEffect, useState } from "react";
import "./search-filters.css";

const RadioButtonGroup = (props) => {
  const { radioButtonData: data, onChangeHandler } = props;
  const { options, key: filterName } = data;
  const [checked, setChecked] = useState("");

  const handleOptionChange = (selectedValue) => {
    setChecked(selectedValue);
  };

  useEffect(() => {
    onChangeHandler(filterName, checked);
  }, [checked]);

  return options.map((option) => (
    <Box display="flex" direction="row" key={option.key}>
      <Box paddingY={1}>
        <RadioButton
          checked={option.key === checked}
          id={option.key}
          label={option.display}
          name={data.title}
          onChange={handleOptionChange.bind(null, option.key)}
          value={option.display}
        />
      </Box>
    </Box>
  ));
};

const CheckboxGroup = (props) => {
  const { checkBoxData: data, onChangeHandler } = props;
  const { options, key: filterName } = data;
  const [selected, setSelected] = useState({});

  const handleChange = (key, checked) => {
    setSelected({
      ...selected,
      [key]: checked,
    });
  };

  useEffect(() => {
    onChangeHandler(filterName, selected);
  }, [selected]);

  return options.map((option) => (
    <Box display="flex" direction="column" key={option.key}>
      <Box paddingY={1}>
        {" "}
        <Checkbox
          checked={selected[option.key]}
          id={option.key}
          label={option.display}
          name={options.title}
          onChange={handleChange.bind(null, option.key, !selected[option.key])}
        />
      </Box>
    </Box>
  ));
};

const SearchFilters = (props) => {
  const { filterData: filters, setSelectedFilters } = props;

  const displayFilters = (filters) => {
    return filters.map((filter) => {
      switch (filter.type) {
        case "oneOf":
          return (
            <RadioButtonGroup
              radioButtonData={filter}
              onChangeHandler={setSelectedFilters}
            ></RadioButtonGroup>
          );
        case "many":
          return (
            <CheckboxGroup
              checkBoxData={filter}
              onChangeHandler={setSelectedFilters}
            ></CheckboxGroup>
          );
        default:
          return null;
      }
    });
  };

  return <div className="search-filters">{displayFilters(filters)}</div>;
};

export default SearchFilters;
