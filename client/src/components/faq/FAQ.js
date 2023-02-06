import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React from "react";
import { DYOMContent } from "../../styles/components/DYOMContainer";
import { FilterBox } from "../../styles/components/FilterBox";

export function FAQ() {
  return (
    <DYOMContent>
      <Typography variant="h2" align="center" mb={4}>
        Frequently Asked Questions
      </Typography>
      <FilterBox />
      <Accordion>
        <AccordionSummary>
          <Typography>Loren Ipsun</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </DYOMContent>
  );
}
