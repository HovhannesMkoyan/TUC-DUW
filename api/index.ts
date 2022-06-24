import { app, sequelize } from "./server";
import { wtcLogin } from "./src/helpers/wtc-login";

const port = process.env.PORT;
sequelize
  .sync()
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  )
  .then(() => wtcLogin(() => console.log("Logged in into WTC")))
  .catch((e: any) => console.log(e));
