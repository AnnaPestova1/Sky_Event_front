import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Drawer,
  IconButton,
  Fade,
  Grid,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Slide,
  SwipeableDrawer,
  Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Favorite } from "@mui/icons-material";

const SharedCard = ({ data, handleDelete, handleEdit, handleSaveEvent }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  let eventDate = "";
  const eventMap = [
    { value: "comet", displayName: "Comet" },
    { value: "asteroid", displayName: "Asteroid" },
    {
      value: "meteor_shower",
      displayName: "Meteor Shower"
    },
    {
      value: "solar_eclipse",
      displayName: "Solar Eclipse"
    },
    {
      value: "lunar_eclipse",
      displayName: "Lunar Eclipse"
    }
  ];
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const eventDetails = eventMap.find(event => event.value === data.event);

  if (data.date) {
    eventDate = new Date(data.date).toLocaleDateString(undefined, {
      timeZone: "UTC"
    });
  }
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Card
        elevation={0}
        sx={{
          maxWidth: 350,
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}>
        <CardHeader
          sx={{
            "overflow": "hidden",
            "& [class *='MuiCardHeader-content']": {
              overflow: "hidden"
            }
          }}
          title={data.name}
          titleTypographyProps={{
            variant: "body",
            title: data.name,
            sx: {
              fontWeight: "bold",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }
          }}
          subheader={eventDetails.displayName}
          subheaderTypographyProps={{ variant: "body2" }}
          action={
            handleDelete && (
              <IconButton
                aria-label="buttons"
                id="card-header-buttons"
                aria-controls={open ? "card-header-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )
          }
        />
        <Menu
          id="card-header-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "card-header-buttons"
          }}>
          <MenuItem onClick={handleClose}>
            <Button size="small" onClick={handleEdit}>
              Edit
            </Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
          </MenuItem>
        </Menu>
        <CardMedia
          component="img"
          height="200"
          image={data.image}
          alt={eventDetails.value}
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1
          }}>
          {data.date ? (
            <>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="span">
                event date: {eventDate}
              </Typography>
            </>
          ) : null}

          <Typography variant="body2" component="div">
            {data.description}
          </Typography>
        </CardContent>

        {handleSaveEvent && (
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              startIcon={<Favorite />}
              size="small"
              onClick={handleSaveEvent}>
              Save
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

SharedCard.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSaveEvent: PropTypes.func
};

export default SharedCard;
