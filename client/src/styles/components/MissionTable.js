import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import React from "react";

function createData(
  name,
  author,
  lastUpdate,
  rating,
  views,
  downloads,
  comments
) {
  return { name, author, lastUpdate, rating, views, downloads, comments };
}

const rows = [
  createData("Mission", "Someone", "02-02-2000", 10, 420, 420, 3),
  createData("Mission", "Someone", "02-02-2000", 10, 420, 420, 3),
  createData("Mission", "Someone", "02-02-2000", 10, 420, 420, 3),
  createData("Mission", "Someone", "02-02-2000", 10, 420, 420, 3),
  createData("Mission", "Someone", "02-02-2000", 10, 420, 420, 3),
];

export function MissionTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mission Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Views</TableCell>
            <TableCell>Downloads</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.lastUpdate}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell>{row.views}</TableCell>
              <TableCell>{row.downloads}</TableCell>
              <TableCell>{row.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
