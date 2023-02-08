import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { DYOMContent } from "../../styles/components/DYOMContainer";
import { FilterBox } from "../../styles/components/FilterBox";
import { faqStrings } from "./faqStrings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function FAQ() {
  return (
    <DYOMContent>
      <Typography variant="h2" align="center" mb={4}>
        Frequently Asked Questions
      </Typography>
      <FilterBox />
      {faqStrings.map((el) => (
        <Accordion>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: "white",
                  bgcolor: "background.box",
                  borderRadius: "20px",
                }}
              />
            }
          >
            <Typography variant="body1">{el.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{el.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </DYOMContent>
  );
}