# Choose Gif

_Created by Franco Ortega, Kevin Fiero, and Bryana Kitchen_

### `Purpose`

Choose Gif uses the [Giphy](http://giphy.com) API to gather raw data, manipulate data, and display data on to the app.

### `Problem Domain`

Our app is a lightweight version of the Giphy website that allows users to save favorite gifs and copy gif URLs to share with their friends.  The app is compatible with mobile, so users can use it on the go.

### `Libraries, Frameworks, and Packages` (Oh my!)

Choose Gif is built using React framework with scripts that include React Router Dom, React Copy to Clipboard, and Superagent.

### `User Instructions`

You may access the live site which is hosted on [Netlify](https://choose-gif-fe.netlify.app).

### `API Endpoint Examples`

We have several endpoints users can navigate through. A few examples include:
- /search
- /trending
- /api/favorites

The favorites endpoint is one of our protected routes where only a user with the corresponding token will have access.

### `Database Schemas`

Our app consists of two database schemas:

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(256) NOT NULL,
        hash VARCHAR(512) NOT NULL
    );

    CREATE TABLE favorites (
        id SERIAL PRIMARY KEY NOT NULL,
        giphy_id VARCHAR(256) NOT NULL,
        title VARCHAR(256) NOT NULL,
        owner_id INTEGER NOT NULL REFERENCES users(id)
    );

### `Find us on LinkedIn:`
- [Franco](https://www.linkedin.com/in/francoortega)
- [Kevin](https://www.linkedin.com/in/kevinfiero)
- [Bryana](https://www.linkedin.com/in/bryanakitchen)
