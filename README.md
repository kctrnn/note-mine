# Note Mine 🤚
View live demo: https://notemine.netlify.app

## 🐧 Features:
1. Authentication with JWT
- Login
- Sign up
- Update account

2. Note
- Drag And Drop (Reorder blocks easily by drag and drop)
- Turn the block into different content types
- HTML Support (Use regular HTML tags like in text blocks)
- Image Support (Upload images by using the select menu)
- User Management (Create an account to create private pages)

## 🏠 Built With
The frontend is built with Reactjs. On the backend, a REST API is built with Strapi.io handles saving user content and user management.
### Front end
- [Reactjs](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start)
- [react-contenteditable](https://www.npmjs.com/package/react-contenteditable) and [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [Material UI](https://material-ui.com/)
- [Sass](https://sass-lang.com/)
- [Axios](https://www.npmjs.com/package/axios)

### Back end
- [Strapi.io](https://strapi.io/)

## 🚀 API Guide
- API_URL: `https://api-notemine.herokuapp.com`

### Authenticated API

#### Endpoints

/pages

- GET /pages
- GET /pages/:pageId
- POST /pages
- PUT /pages/:pageId
- DELETE /pages/:pageId

/blocks

- GET /blocks
- GET /blocks/:blockId
- POST /blocks
- PUT /blocks/:blockId
- DELETE /blocks/:blockId

### Public API

#### Endpoints

- POST /auth/local
- POST /auth/local/register

## 🍔 How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/kctrnn/note-mine

# Install dependencies
$ npm install

# Run the app
$ npm start
```
