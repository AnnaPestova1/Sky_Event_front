# README

The Sky Events is the final project for the Code The Dream Node.js class.

Tried to implement Full Stack app.

The Front End repository is here. The Back End repository: https://github.com/AnnaPestova1/Sky_Event_back

The Sky Events app allows users to organize the sky events data they want to observe.

The Front End is built on Vite React and Material UI.
The Back end is built on Node.js with Express.
MongoDB is used as a database.

The app uses NASA API foe comets and asteroids data, and and for part of images, Astronomical Applications Department of the U.S. Naval Observatory API for Solar Eclipses API, Lunar Eclipses and Meteorite Showers data saved as JSON files on Back End.

Tried to implement Google Auth and add an event to the calendar.

You can try to use the app here: https://annapestova.onrender.com
The Back End deployed here: https://annapestova-sky-events-back.onrender.com

.env.local file has the follow structure:
VITE_CLIENT_ID = (Google Auth client_id)
VITE_REDIRECT_URL = http://localhost:3000/api/v1/auth/oauth/google
VITE_SERVER_URL = http://localhost:3000
