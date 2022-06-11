import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as LinkedinStrategy } from "passport-linkedin-oauth2";
import { Request } from "express";

import { container } from "../../dependency-injection-setup";

const oauthService = container.resolve("oauthService");
const db = container.resolve("db");

export default (passport: any) => {
  /*
   *
   * Google Strategy
   *
   */
  passport.use(
    new GoogleStrategy(
      {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "/api/auth/google/callback",
        passReqToCallback: true,
      },
      async function (req: Request, _: any, __: any, profile: any, done) {
        try {
          const user = await handleAuth(req, profile, "google");
          return done(null, user);
        } catch (error: any) {
          return done(error);
        }
      }
    )
  );

  /*
   *
   * Facebook Strategy
   *
   */
  passport.use(
    new FacebookStrategy(
      {
        clientID: `${process.env.FACEBOOK_APP_ID}`,
        clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["id", "email", "first_name", "last_name"],
        passReqToCallback: true,
      },
      async function (req: Request, _: any, __: any, profile: any, done) {
        try {
          const user = await handleAuth(req, profile, "facebook");
          return done(null, user);
        } catch (error: any) {
          return done(null, false);
        }
      }
    )
  );

  /*
   *
   * Linkedin Strategy
   *
   */
  passport.use(
    new LinkedinStrategy(
      {
        clientID: `${process.env.LINKEDIN_CLIENT_ID}`,
        clientSecret: `${process.env.LINKEDIN_CLIENT_SECRET}`,
        callbackURL: "/api/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
        passReqToCallback: true,
      },
      async function (req: Request, _: any, __: any, profile: any, done) {
        try {
          const user = await handleAuth(req, profile, "linkedin");
          return done(null, user);
        } catch (error: any) {
          return done(error.message);
        }
      }
    )
  );

  // serializeUser determines which data of the user object should be stored in the session.
  // The result of the serializeUser method is attached to the session as req.session.passport.user = {}
  passport.serializeUser((user: any, done: any) => {
    done(null, user.uuid);
  });

  passport.deserializeUser((uuid: string, done: any) => {
    db.models.User.findOne({ where: { uuid } })
      .then((user: any) => {
        done(null, user);
      })
      .catch((error: any) => {
        done(error);
      });
  });
};

function extractUserDate(profile: any, provider: string) {
  return {
    provider,
    provider_id: profile.id,
    email: profile.emails[0].value,
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
  };
}

async function handleAuth(req: any, profile: any, provider: string) {
  const ip = req.connection.remoteAddress;
  const userData = extractUserDate(profile, provider);

  return oauthService.authenticate(ip, userData);
}
