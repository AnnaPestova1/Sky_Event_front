# The Sky Events App

The Sky Events app allows users to organize the sky events data they want to observe.

The Sky Events is the final project for the Code The Dream `Node.js` class.
This is an attempt to implement Full Stack app.
This is the Front End repository. The Back End repository: https://github.com/AnnaPestova1/Sky_Event_back

## Technologies

The Front End is built with `Vite React` and `Material UI`.
The Back end is built with `Node.js` with `Express JS`.
`MongoDB` is used as a storage database.

## Data sources (APIs)

- The app uses `NASA API` for the comets and asteroid data, and for images (partly)
- Astronomical Applications Department of the U.S. Naval Observatory API for Solar Eclipses data
- Lunar Eclipses and Meteorite Showers data are saved as local JSON files on Back End due to the lack of free APIs.

## Additional features

- Attempt to implement Google OAuth for authenticating and registering users
- Attempt to implement downloadable `.ics` file for the users to add events to their calendar.

## Links

- Main app URL: https://annapestova.onrender.com (deployed at Render)
- The Back End URL: https://annapestova-sky-events-back.onrender.com (deployed at Render)

## ENV file structure

`.env.local` file has the following structure:
VITE_CLIENT_ID = (Google Auth client_id)
VITE_REDIRECT_URL = http://localhost:3000/api/v1/auth/oauth/google
VITE_SERVER_URL = http://localhost:3000
