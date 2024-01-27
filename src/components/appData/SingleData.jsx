import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Grid,
//   Typography
// } from "@mui/material";
import SharedCard from "../SharedCard";
const SingleData = ({ data, handleDelete }) => {
  const navigate = useNavigate();
  console.log(data);
  const eventMap = [
    { value: "comet", image: "/comet.jpg" },
    { value: "asteroid", image: "/asteroid.jpg" },
    { value: "meteor_shower", image: "/meteor_shower.jpeg" },
    { value: "solar_eclipse", image: "/solar_eclipse.jpg" },
    { value: "lunar_eclipse", image: "/lunar_eclipse.jpg" }
  ];
  const handleEditButton = () => {
    let dataId = data._id;
    navigate(`edit/${dataId}`);
  };
  if (!data.image) {
    eventMap.forEach(event => {
      if (event.value === data.event) {
        data.image = event.image;
      }
    });
  }
  return (
    <SharedCard
      data={data}
      handleDelete={handleDelete}
      handleEdit={handleEditButton}
    />
  );
};

SingleData.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func
};

export default SingleData;
