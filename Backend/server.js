import app from "./utils/app.js";
import { v2 as cloudinary } from "cloudinary";

const port = process.env.PORT;
console.log(process.env.CLOUDINARY_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  cloud_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(port, () => {
  console.log(`server listen port :: localhost:${port}`);
});
