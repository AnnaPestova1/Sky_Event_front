import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import SharedRow from "./SharedRow";

const SharedTable = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ maxHeight: 400, width: "100%" }}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Event</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Event date</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => {
            return <SharedRow key={i} data={d} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SharedTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default SharedTable;
