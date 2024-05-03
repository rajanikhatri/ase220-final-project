# Travel Suggestion Web Application

A web application designed to provide users with a platform to explore and discover countries, cities, and places of interest in Asia. The app offers a virtual travel experience, allowing users to interact with the content through comments and contributions.

## Features
### Browse Countries in Asia
- View a list of countries in Asia on the homepage.
- Each country is displayed as a card with basic information.
- The card includes an "Explore" button to navigate to cities within that country, along with "Edit" and "Delete" buttons for managing countries.

### Explore Cities Within Countries
- Click the "Explore" button on a country card to view popular cities within that country.
- Each city is displayed as a card with an "Explore" button to navigate to places in that city, along with "Edit" and "Delete" buttons for managing cities.

### Discover Places of Interest in Cities
- Click the "Explore" button on a city card to view popular places in that city.
- Each place is displayed as a card with an "Explore" button to view comments and replies, along with "Edit" and "Delete" buttons for managing places.

### View and Add Comments
- Users can view comments left by other users about specific places.
- Without logging in, users can read existing comments but cannot add new comments or reply to existing ones.
- After logging in, users have the ability to add new comments and reply to existing ones.

### User Authentication
- Sign up using name, email, and password.
- Log in with registered email and password.
- JWT-based authentication with a 30-day expiration for access tokens.

### Content Editing, Addition, and Deletion
- **Addition**: After logging in, users can add new countries, cities, places, comments, and replies. An "Add" button becomes visible once the user is logged in.
- **Editing and Deletion**: Logged-in users can edit or delete countries, cities, and places they created. If a logged-out user tries to edit or delete, a login modal prompts them to log in. If a logged-in user attempts to edit or delete an item they didn't create, an error message appears at the bottom of the card.

## Project Structure
### Backend
- **Models**: Defines the structure for users, countries, cities, places, comments, and replies.
- **Controllers**: Contains logic for handling operations related to users, countries, cities, places, comments, and replies.
- **Routes**: Defines the API endpoints for various functionalities.
- **Server**: Express.js server setup, including middleware, route handling, and static file serving.
- **Database**: MongoDB is used to store user, country, city, place, comment, and reply data.

### Frontend
- HTML files to display the list of countries, cities, places, and comments.
- Separate pages for each level of navigation (countries, cities, places, and comments).

### Middleware
- Middleware controller to verify JSON Web Tokens (JWT) for user authentication and authorization.

## Limitations
- Edit and delete functionality for comments and replies is implemented in the backend, but not in the frontend due to time constraints.
- The backend supports access and refresh tokens, but the frontend does not yet use refresh tokens to generate new access tokens.
  
## Setup and Installation
### Prerequisites
- Node.js and npm
- MongoDB
  
### Backend Installation
1. Clone the repository.
2. Navigate to the backend directory and run `npm install`.
3. Set up a `.env` file with MongoDB connection details, JWT keys, and other environment variables.
4. Start the server by running `npm start`.

### Frontend Installation
1. Navigate to the frontend directory.
2. Ensure that the backend server is running.
3. Serve the frontend files using a static file server or development server.
4. Open a web browser and go to `http://localhost:8000/` (adjust the port if needed) to interact with the application.

## Future Development
- Implement refresh token functionality in the frontend to generate new access tokens.
- Fully integrate edit and delete functionality for comments and replies in the frontend.
- Explore additional authentication security features and user roles for expanded functionality.

## Contributions
- **Khanh Nguyen**: Handled backend development, including setting up database models, creating controllers, and defining routes. Designed the API endpoints and implemented logic to handle HTTP requests. Additionally, transitioned data handling from using JSON blobs to a backend-driven approach, creating API calls that enabled the frontend to interact with the backend, specifically for the `index.html` and `comments.html` pages.
- **Bhuwan**: 
- **Rajani**: 

## Demo Video
Link: 
