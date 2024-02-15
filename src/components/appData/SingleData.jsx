import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";

const SingleData = ({ data, handleDelete }) => {
  const navigate = useNavigate();
  let eventDate = "";
  const eventMap = [
    { value: "comet", displayName: "Comet", image: "comet.jpg" },
    { value: "asteroid", displayName: "Asteroid", image: "asteroid.jpg" },
    {
      value: "meteor_shower",
      displayName: "Meteor Shower",
      image: "meteor_shower.jpeg"
    },
    {
      value: "solar_eclipse",
      displayName: "Solar Eclipse",
      image: "solar_eclipse.jpg"
    },
    {
      value: "lunar_eclipse",
      displayName: "Lunar Eclipse",
      image: "lunar_eclipse.jpg"
    }
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
    <Grid item xs={12} md={6}>
      <Card variant="outlined" sx={{ maxWidth: 500, height: "100%" }}>
        <CardActionArea sx={{ height: "90%" }} onClick={handleEditButton}>
          {eventMap.map((event, id) => {
            if (event.value === data.event) {
              return (
                <CardMedia
                  component="img"
                  height="200"
                  key={id}
                  image={event.image}
                  alt={event.value}
                />
              );
            }
          })}

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div">
                event
              </Typography>
              <Typography variant="body" component="div">
                {eventMap.map(event => {
                  if (event.value === data.event) {
                    return event.displayName;
                  }
                })}
              </Typography>
            </CardContent>
            {data.date ? (
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="span">
                  date:
                </Typography>
                <Typography variant="body" component="span">
                  {" "}
                  {eventDate}
                </Typography>
              </CardContent>
            ) : null}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div">
                name
              </Typography>
              <Typography variant="body" component="div">
                {data.name}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div">
                description
              </Typography>
              <Typography variant="body" component="div">
                {data.description}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

SingleData.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func
};

export default SingleData;
