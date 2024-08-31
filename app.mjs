import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
// Security
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
dotenv.config();
// Your remaining code stays the same
// import globalErrorHandler from './controllers/errorController';
// Import the routes
import herosRoutes from "./routes/api/heros.mjs";
// import userRoutes from './routes/api/userRoutes.mjs';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//app.use(compression);
const db = process.env.mongoURI;
console.log(db)
async function run() {
  console.log("connecting to DB .../ ");
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected !");
  } catch (err) {
    console.log("DB connection Error " + err);
  }
}
await run();


if (process.env.NODE_ENV === "gen") {
  let testRoutes;
  try {
    testRoutes = await import("./routes/test.mjs");
  } catch (error) {
    // Handle the error or set a default value if the module doesn't exist
    console.error("Error importing testRoutes:", error);
    testRoutes = null; // or some default value
  }
  if (testRoutes) {
    app.use(`/test`, testRoutes.default);
    console.log("🤡 test mood is runing 🤡");
  } else {
    console.error(
      "// Module doesn't exist or there was an error while importing it"
    );
  }
}

// Set security HTTP headers
app.use(helmet());
// Limit requests from same API
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
//  for white list query parametars ...
app.use(
  hpp({
    whitelist: ["month", "year", "toExcel"],
  })
);

const V = process.env.API_Virsion;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: `welcome to boycott education `,
  });
});
// app.get(`/privacypolicies`, (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/policy/", 'policy.html'));
// });

app.use("/xlsx", express.static(path.resolve("public/xlsx")));

app.use(`/api/${V}/heros`, herosRoutes);
// app.use(`/api/${V}/admin`, adminRoutes);

// if (process.env.NODE_ENV === 'gen') {
//   let testRoutes;
//   try {
//     testRoutes = await import('./routes/test.mjs');
//   } catch (error) {
//     // Handle the error or set a default value if the module doesn't exist
//     console.error('Error importing testRoutes:', error);
//     testRoutes = null; // or some default value
//   }
//   if (testRoutes) {
//     app.use(`/test`, testRoutes.default);
//     console.log("🤡 test mood is runing 🤡");
//   } else {
//     console.error("// Module doesn't exist or there was an error while importing it");
//   }
// }

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "fail",
    message: `can't find ${req.originalUrl} in the server `,
  });
});

import { init } from './initialData.mjs';
init();
//app.use(globalErrorHandler);
export default app;
