import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import {
  Event,
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  MoreVert
} from "@mui/icons-material";

const SharedCard = ({
  data,
  handleCalendar,
  handleDelete,
  handleEdit,
  handleSave,
  saved
}) => {
  //shared card for different components. With different layouts for different components.
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  let eventDate = "";
  //handle different events for rendering in card
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
  //handle rendering for different events type in card. Value comes as a props
  const eventDetails = eventMap.find(event => event.value === data.event);
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  //the MongoDB saves date in UTC time zone. Tried to handle both variants: UTC format date and local time zone date.
  if (data.date) {
    if (!handleSave) {
      eventDate = new Date(data.date).toLocaleDateString(undefined, {
        timeZone: "UTC"
      });
    } else {
      eventDate = new Date(data.date).toLocaleDateString();
    }
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          elevation={0}
          sx={{
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
                  <MoreVert />
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
            <MenuItem onClick={handleCalendar}>
              <Button startIcon={<Event />}>To calendar</Button>
            </MenuItem>
            <MenuItem onClick={handleEdit}>
              <Button startIcon={<Edit />}>Edit</Button>
            </MenuItem>
            <MenuItem onClick={handleOpenConfirmation}>
              <Button startIcon={<Delete />}>Delete</Button>
            </MenuItem>
          </Menu>

          <CardMedia
            component="img"
            height="200"
            image={data.eventImage || data.image}
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
          {handleSave && (
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                startIcon={saved ? <Favorite /> : <FavoriteBorder />}
                size="small"
                disabled={saved ? true : false}
                onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-describedby="delete-dialog-confirmation">
        <DialogContent>
          <DialogContentText id="delete-dialog-confirmation">
            Delete this sky event?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

SharedCard.propTypes = {
  data: PropTypes.object,
  handleCalendar: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSave: PropTypes.func,
  saved: PropTypes.bool
};

export default SharedCard;
