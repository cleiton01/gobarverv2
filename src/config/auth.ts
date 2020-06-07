import 'dotenv/config';
export default {
  jwt: {
    secrect:process.env.APP_SECRECT,
    expiresIn:process.env.APP_SESSION_EXPIRESIN,
  },
}
