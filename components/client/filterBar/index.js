"use client";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Slider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Samsung", "iPhone"];

function valuetext(value) {
  return `${value}°C`;
}

function FilterBar() {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [personName, setPersonName] = useState([]);

  const handleBrandChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box boxSizing={"border-box"} padding={1} bgcolor={"white"} mt="8px">
      <Stack direction={"column"} p={2} spacing={2}>
        <Typography fontWeight={570}>Filters</Typography>
        <Divider />
        <Typography
          mt={2}
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"center"}
          alignItems={"center"}
          textTransform={"uppercase"}
        >
          Price <Button variant={"text"}>Clear</Button>
        </Typography>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          step={10}
          marks
          min={10}
          max={110}
        />
        <Divider />
        <FormControl>
          <InputLabel id="demo-multiple-checkbox-label">Brand</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleBrandChange}
            input={
              <OutlinedInput
                label="Brand"
                // notched={false}
                autoFocus={false}
                sx={{ border: "none" }}
              />
            }
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  size="small"
                  checked={personName.indexOf(name) > -1}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider />
        <CustomAccordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography textTransform={"uppercase"}>
              customer ratings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <Typography
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <Checkbox /> 4★ & above
              </Typography>
              <Typography
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <Checkbox /> 3★ & above
              </Typography>
              <Typography
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <Checkbox /> 2★ & above
              </Typography>
              <Typography
                alignItems={"center"}
                display={"flex"}
                flexDirection={"row"}
              >
                <Checkbox /> 1★ & above
              </Typography>
            </FormControl>
          </AccordionDetails>
        </CustomAccordion>
      </Stack>
    </Box>
  );
}

export default FilterBar;

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
}));
