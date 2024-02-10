import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ical, { ICalCalendarMethod, ICalCalendar } from "ical-generator";
import { saveBlobAsFile } from "../../utils/helperFunc";
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
  // console.log(data);
  const eventMap = [
    { value: "comet", image: "/comet.jpg" },
    { value: "asteroid", image: "/asteroid.jpg" },
    { value: "meteor_shower", image: "/meteor_shower.jpeg" },
    { value: "solar_eclipse", image: "/solar_eclipse.jpg" },
    { value: "lunar_eclipse", image: "/lunar_eclipse.jpg" }
  ];
  // const calendar = ical({ name: "add event to calendar" });
  // calendar.method(ICalCalendarMethod.REQUEST);
  // calendar.createEvent({
  //   start: data.date,
  //   end: data.date,
  //   summary: data.event,
  //   description: data.description,
  //   location: "sky"
  // });
  const handleCalendar = () => {
    const calendar = ical({ name: "add event to calendar" });
    calendar.method(ICalCalendarMethod.REQUEST);
    const correctedDate = new Date(data.date).toLocaleDateString(undefined, {
      timeZone: "UTC"
    });
    const start = new Date(correctedDate);
    const end = new Date(correctedDate);
    end.setHours(start.getHours() + 1);
    calendar.createEvent({
      start: start,
      end: end,
      summary: data.event,
      description: data.description,
      location: "sky"
    });
    console.log(calendar, calendar.toString());
    const blob = new Blob([calendar.toString()], { type: "text/plain" });
    saveBlobAsFile(blob, `SkyEvent_calendar(${data.event}).ics`);
  };
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
      handleCalendar={handleCalendar}
    />
  );
};

SingleData.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func
};

export default SingleData;
