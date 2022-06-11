import { Router } from "express";
import { Request, Response } from "express";
import passport from "passport";

import { container } from "../../dependency-injection-setup";
const userMapper = container.resolve("userMapper");

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const user = req.user ? userMapper.toEntity(req.user) : null;
  return res.status(200).json(user);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/join" }),
  function (req, res) {
    //res.cookie('uuid', (req.user as IUser).uuid, { maxAge: 900000, httpOnly: true, secure: true });
    // Successful authentication, redirect home.
    res.redirect(process.env.APP_ENDPOINT as string);
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"], prompt: "select_account" })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/join" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.APP_ENDPOINT as string);
  }
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", { state: "SOME STATE", prompt: "select_account", })
);
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/join" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.APP_ENDPOINT as string);
  }
);

router.get("/logout", (req: Request, res: Response) => {
  if (req.user || req.session) {
    req.logOut();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res
          .clearCookie("sid", {
            path: "/",
            httpOnly: true,
          })
          .json({ success: true });
      }
    });
  } else {
    var err = new Error("You are not logged in!");
    return res.status(500).json({
      success: false,
      err,
    });
  }
});

export default router;
