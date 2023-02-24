import React from "react";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function ProjectTable(props) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (loading) {
      if (props.data.length > 0) {
        setData(JSON.parse(JSON.stringify(props.data)));
        if (data.length > 0) {
          setHeaders();
        }
      }
    }
    if (!props.custom) setLoading(false);
  }, [props.data, data, loading]);

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

  const setHeaders = () => {
    const fieldMap = {
      title: "Project Title",
      views: "Views",
      downloads: "Downloads",
      type: "Type",
      updatedAt: "Last Update",
    };
    const fieldOrder = [
      "Project Title",
      "Type",
      "Last Update",
      "Views",
      "Downloads",
    ];

    let newData = [];

    data.map((element) => {
      delete element._id;
      let outputObject = Object.keys(element).reduce((acc, key) => {
        if (fieldMap.hasOwnProperty(key)) {
          acc[fieldMap[key]] = element[key];
        } else {
          acc[key] = element[key];
        }
        return acc;
      }, {});

      const sortedObject = fieldOrder.reduce((acc, key) => {
        if (outputObject.hasOwnProperty(key)) {
          acc[key] = outputObject[key];
        }
        return acc;
      }, {});

      newData.push(sortedObject);
    });

    setData(newData);
    setLoading(false);
  };

  return loading || props.loading ? null : (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {props.custom ? (
              Object.keys(data[0]).map((k) => (
                <TableCell key={k}>{k}</TableCell>
              ))
            ) : (
              <>
                <TableCell>Project Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Downloads</TableCell>
                <TableCell>Comments</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.custom
            ? data.map((element, index) => (
                <TableRow key={element["Project Title"]}>
                  {Object.entries(element).map(([k, v]) => (
                    <TableCell>
                      {console.log(index)}
                      {k === "Project Title" ? (
                        <Link
                          component={RouterLink}
                          to={`/${
                            element["Type"] === "Mission Pack"
                              ? "mps"
                              : "missions"
                          }/${props.data[index]._id}`}
                        >
                          {v}
                        </Link>
                      ) : (
                        v
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : props.data?.length > 0
            ? props.data?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Link component={RouterLink} to={`${row._id}`}>
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`profile/${row.author._id}`}
                    >
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
