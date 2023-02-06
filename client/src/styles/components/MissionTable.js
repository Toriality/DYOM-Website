import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  Link,
} from "@mui/material";
import React from "react";

export function MissionTable(props) {
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    if (props.data.length > 0) {
    }
  }, [props.data]);

  const changeUpdate = (e) => {
    let date = new Date(e);
    date = date.toLocaleString("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return date;
  };

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
          {props.data.length > 0
            ? props.data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Link href={`/missions/${row._id}`}>{row.title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/${row.author._id}`}>
                      {row.author.username}
                    </Link>
                  </TableCell>

                  <TableCell>{changeUpdate(row.updatedAt)}</TableCell>
                  <TableCell>{row.rating}</TableCell>
                  <TableCell>{row.views}</TableCell>
                  <TableCell>{row.downloads}</TableCell>
                  <TableCell>{row.comments}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
