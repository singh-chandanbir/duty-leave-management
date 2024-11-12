import "dotenv/config";
import { connectDB } from "./database/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("server is running on port: ", port);
    });
  })
  .catch((error) => {
    console.log("DB connextion faild", error);
  });
