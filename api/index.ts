import { app, sequelize } from "./server";
import scheduler from "./src/scheduler";

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, async () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      if (process.env.NODE_ENV === "production") {
        scheduler();
      }
    });
  })
  .catch((e: any) => console.log(e));
