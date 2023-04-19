# [Gumbercules House Of Games Front End](https://gumberhog.netlify.app)

This portfolio piece created as part of the Northcoders Bootcamp using React and the [previously created Back End API](https://github.com/gumbercules35/Games-Backend) to serve reviews on Board Games to users!

## Complete Features

Users can currently:

- View a full list of all reviews

  - This list can be sorted by the following criteria

    - Date Posted (default)
    - Review ID
    - Category
    - Title
    - Designer
    - Votes
    - Comment Count

  - This sort can be applied Ascending or Descending at the users choice

- By clicking a Review's image or title the user will be taken to and expanded view of that Review

  - This page contains more detailed information on the Review, including the body and the comments associated to that Review
  - Each Review has a number of Votes and users can either Upvote or Downvote a Review, and change their mind as they wish

- Users can view a list of all categories with their descriptions from the API, with each category name being a link to a filtered view of the Reviews page showing only those Reviews associated with that category

- A User (grumpy19) is currently hard-coded to be "logged-in"

  - As this user, comments can be left using the submission form above the list of comments (75 Character Max, No empty posts)
  - The user is able to delete their own comments from a Review

## Planned Features

- A full list of users, and navigation embedded into usernames as they appear on the site to take the user to the specific profile of other users
- The ability to post your own Reviews
- Pagination of data

## Install Guide

**_Please note this repo requires Node v19.7.0 to run locally_**

1. Clone the repo locally in your chosen location through terminal using the command  
   _git clone https://github.com/gumbercules35/FE-GHOG.git_
2. Once cloned using the _cd_ command to move into the newly created repo
3. Run _npm install_ to install the required dependencies for the project
4. Run _npm start_ to host the App locally (default port 3000)
