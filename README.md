Build a database driven React app
Overview
Putting together the React client code, Node.js server code and Postgres database to build a full stack React application.


🎯 Design a database schema with relationships between tables

🎯 Create a new application with a React client and an Express server
(again, remember the client and the server should be separate)

🎯 Seed the database with data. Either run your SQL queries in Supabase SQL Editor OR use a seed.js file. (if you use the Supabase editor, save the scripts you run in a file in your project, in case you need to rerun them, or we need to duplicate the project)

🎯 Create Express endpoints to handle requests so you can POST and GET the data appropriately for your application.

🎯 Create multiple pages using react-router-dom

🎯 Create a home page.
🎯 Create a page to show all the posts and use fetch to call your server to get your data.
🎯 Create a page where users can create new posts using a form.


REQUIREMENTS

🐿️ As a user, I want to be able to create new posts and add them to the page
🐿️ As a user, I want to be able to assign a category to each post
🐿️ As a user, I want to be able to view all posts added on the page and the category they're in

🐿️ As a user, I want to be able to view all posts in a specific category by visiting a dedicated page for that category (Stretch Goal)
🐿️ As a user, I want to be able to add new categories (Stretch Goal)
Requirements

Please note for the word category i used hashtags, so just typing in any number of hashtags into a message will then allow you to view only posts with that hashtag, i hope doing it that way met the requirements.

Stretch Goals

🏹 Allow users to DELETE posts

🏹 Allow users to filter posts in a specific category. Use either a query string like /posts?category=education or a dedicated route for the categories at /posts/:categoryName.

for post liking the database is set up for it, but haven't done the front end for it yet



What went really well and what could have gone better?

Not a lot went well, i really over complicated things, designing the tables in teh database was fine, but then i decided to use teh supabase package and not pg for queries as i was thinking about authentication, to begin with this was fine, especially as it returns json objects, but it turns out really difficult queries or filtering isn't possible, so i would have to write some db functions to cover it.

but it took me a long time trying to find the right documentation for this

the same goes for react router, i had seen the newer version of react use a different browser router, to facilitate data loading, but again it took me a long time going through documentation to get it all working.

regarding adding likes, im still not sure how best to get the information for each post showing which post the user has already liked or disliked all in one go with the posts, since it seems very inefficient to query each post individually that would be a lot of requests

Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).

React.dev ReactRouter.dev supabase stackoverflow google  