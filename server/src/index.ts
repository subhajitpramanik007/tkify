import { server } from "./lib/socket.js";
import app from "./app.js";
import { connectDB } from "./lib/db.js";

const port = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();

    if (process.env.NODE_ENV !== "production") {
      server.listen(port, () => console.log(`Server running on http://localhost:${port}`));

      server.on("error", (error) => {
        console.error(`Express Error: ${error}`);
        throw error;
      });
    }
  } catch (error) {
    console.error(`Server Error: ${error}`);
    process.exit(1);
  }
})();

export default app;
