import { app, sequelize } from "./server";

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, async () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((e: any) => console.log(e));
