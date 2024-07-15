import express from 'express';
import "./passport/github.auth.js"
import passport from 'passport';
import session from 'express-session'
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from './db/connectMongoDB.js';
import path from 'path';


dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

console.log(__dirname);


const app = express();
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(),'Frontend','dist','index.html'));  // replace with your own path!  // this path should be relative to the project root directory, not the current working directory.  // Make sure your client-side app is set up to serve this file.  // You may need to install serve-static npm package if you haven't already.  // npm install serve-static --save-dev  // then in your server.js file, import and use it like this:  // import serveStatic from'serve-static';  // const serve = serveStatic(path.join(__dirname, 'frontend/dist'));  // app.use(serve);  // app.get('*', (req, res) => {  //   res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));  // });  // this line of code should be at the end
})

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.listen(5000,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    connectMongoDB();
})