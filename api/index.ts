import { app, sequelize } from "./server";
import { wtcLogin } from "./src/helpers/wtc-login";

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .then(() => wtcLogin(() => console.log("Logged in into WTC")))
  .catch((e: any) => console.log(e));
