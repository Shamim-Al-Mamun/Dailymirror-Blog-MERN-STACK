# 📝 Full-Stack Blog Application

Dailymirror is a blog website. In this website various types of news with photos  are posted on daily basis. A profile is maintained who regularly posts. There is a login system only for the Admin panel. Public users cannot login into this. Public users can visit different pages and read the articles. Public user can likes and comments in the post. Public users can list favourites posts. And can send messages to the profile holder regarding posts. There are three types of user in Admin panel, they are Admin, Moderator and General member.

## 🚀 Features

- 🔐 **User Authentication** – Secure registration and login using JWT and bcrypt.
- 📝 **Post Management** – Create, edit, and delete blog posts.
- 💬 **Comment System** – Users can leave comments on posts.
- ❤️ **Like Functionality** – Like posts to show appreciation.
- 🧑‍⚖️ **Role-Based Access Control** – Admin and user roles with permission-based actions.
- 📱 **Responsive Design** – Mobile-first UI that adapts to all screen sizes.
- 🖼️ **Image Uploads** – Support for file uploads using Multer.

---

## 🛠️ Technologies Used

### 📦 Backend (Node.js + Express + MongoDB)

- **[Express.js](https://expressjs.com/)** – Web framework for building APIs and handling routes.
- **[MongoDB](https://www.mongodb.com/)** with **[Mongoose](https://mongoosejs.com/)** – NoSQL database and object modeling.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** – For password hashing and authentication security.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** – JWT-based authentication.
- **[Multer](https://www.npmjs.com/package/multer)** – Middleware for handling file uploads.
- **[dotenv](https://www.npmjs.com/package/dotenv)** – Environment variable management.
- **[CORS](https://www.npmjs.com/package/cors)** – Cross-Origin Resource Sharing support.
- **[Nodemon](https://www.npmjs.com/package/nodemon)** – Live server reloading during development.

### 🎨 Frontend (React)

- **[React](https://reactjs.org/)** – Frontend JavaScript library for building UI.
- **[React Router DOM](https://reactrouter.com/)** – Client-side routing and navigation.
- **[Axios](https://axios-http.com/)** – Promise-based HTTP client.
- **[Bootstrap](https://getbootstrap.com/)** + **[React-Bootstrap](https://react-bootstrap.github.io/)** – Responsive UI framework and React components.
- **[React Bootstrap Icons](https://github.com/ismamz/react-bootstrap-icons)** – Icon pack styled for Bootstrap.
- **[React Icons](https://react-icons.github.io/react-icons/)** – Comprehensive icon library.
- **[Framer Motion](https://www.framer.com/motion/)** – Animation and transitions library.
- **[React Spinners](https://www.npmjs.com/package/react-spinners)** – Loaders and spinners.
- **[React Timer Hook](https://www.npmjs.com/package/react-timer-hook)** – Timer utilities for countdowns and more.
- **[EmailJS](https://www.emailjs.com/)** – Send emails directly from the frontend (e.g., contact form).
- **[Jest](https://jestjs.io/)** & **[React Testing Library](https://testing-library.com/)** – Unit and component testing for frontend reliability.

---


Rules of Admin:
Can create and delete users
Can update the profile
Can create, edit and delete posts. And approve posts posted by moderator or general
Can monitor popular posts and track number of posts per month

Email: mamun@gmail.com

Pass: Mamun12345



Rules of Moderator:
Can update the profile
Can create, edit and delete posts. Post will be published if admin approves
Can monitor popular posts and track number of posts per month

Email: omit@gmail.com

Pass: Omit12345



Rules of General:
Can create, edit and delete post. Post will be published if admin approves
Can monitor popular posts and track number of posts per month

Email: hasan@gmail.com

Pass: Hasan12345



This website was built with MERN Stack technology. Bootstrap 5 was used to style and layout web pages. And for the animation framer motion was used.
