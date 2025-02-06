import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB  from "./config/dbConnection.js";
import { songsRouter } from "./routes/songRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { artisteRouter } from "./routes/artisteRoutes.js";
import { playlistRouter } from "./routes/playlistRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/songs/", songsRouter);
app.use("/api/users/", userRouter);
app.use("/api/artistes/", artisteRouter);
app.use("/api/playlists/", playlistRouter);

const port = process.env.PORT || 6001;

app.listen(port, async () => {
	connectDB();
	console.log(`Server Running At Port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello From Music Backend...");
});