import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";

const SingleData = ({ data, handleDelete }) => {
  const navigate = useNavigate();
  let eventDate = "";
  const eventMap = [
    { value: "comet", displayName: "Comet" },
    { value: "asteroid", displayName: "Asteroid" },
    { value: "meteor_shower", displayName: "Meteor Shower" },
    { value: "solar_eclipse", displayName: "Solar Eclipse" },
    { value: "lunar_eclipse", displayName: "Lunar Eclipse" }
  ];
  if (data.date) {
    eventDate = new Date(data.date).toLocaleDateString(undefined, {
      timeZone: "UTC"
    });
  }
  const handleEditButton = () => {
    let dataId = data._id;
    navigate(`edit/${dataId}`);
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            event
          </Typography>
          <Typography variant="h5" component="div">
            {eventMap.map(event => {
              if (event.value === data.event) {
                return event.displayName;
              }
            })}
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            name
          </Typography>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {data.date ? (
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="span">
              date:
            </Typography>
            <Typography variant="h5" component="span">
              {eventDate}
            </Typography>
          </CardContent>
        ) : null}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div">
            description
          </Typography>
          <Typography variant="h5" component="div">
            {data.description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Button size="small" onClick={handleEditButton}>
          Edit
        </Button>
        <Button size="small" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

SingleData.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func
};

export default SingleData;
