import express from "express"; //要讀取import from 在paclage.json要新增 “type":"moudle"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true, //選用新格式 mongodb+srv://，棄用舊格式
      useUnifiedTopology: true, //刪除新引擎不支援，但對於舊topology引擎的連結功能
    })
    .then(() => {
      console.log("Connecting DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json()); //從外部取得json使用
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something is wrong";
  return res.status(status).json({
    success: false,
    status, //在es6之後 相同的key和值 可以只寫值 不用“”status":status
    message,
  });
});

app.listen(8080, () => {
  connect();
  console.log("listening on port 8080");
});
