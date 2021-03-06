## Facebook Clone Frontend

This is the front end for Facebook Clone.

[Assignment](https://www.theodinproject.com/lessons/nodejs-odin-book)

[Backend Github](https://github.com/ericchi00/Facebook-Clone-Backend)

[Live Demo](https://ericchi00.github.io/Facebook-Clone-Frontend/)

## Technologies

HTML, React-Bootstrap, React, Formik (form valiidation), Yup (schema validation), React Auth Kit (Auth Management Library), Date-FNS (time formatting), S3 (storing images), Single Page Apps for GitHub Pages (fixes router links, by rafgraph)

## Features

Register account and login

Protected Routes on frontend and backend using JWT

Users can change name, email, and upload profile pictures

Users can send, receive, accept, and decline friend requests

Users can remove friends

Users can make posts with text and upload an optional photo

Users can make comments on posts

Home feed displays all posts from all users

People tab displays all users registered

Users can like or unlike posts or comments

Users can view profile and display list of friends and if user made any posts

## Icons

Icons are from [Bootstrap Icons](https://icons.getbootstrap.com/)

## Learning Outcomes

If I were to redo this again, I do use redux to make it easier for authentication for api calls and reduce prop drilling as there's a large amount of it, or I would use Next.js as it optimizes React a lot more and I can just focus on coding. I would also use Tailwindcss instead of Bootstrap as it's less opinionated and more customizable. I should have also separated the bootstrap logic from the JSX as the code isn't as readable with all the bootstrap styling everywhere. I could have also moved the AWS file uploading to the backend instead of using it on the frontend to make time to load on login a lot faster. Overall, it was really fun to make and see how everything comes together.
