import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import config from "../config/config";
import passport, { IReq } from "../config/passport";
import logger from "../tools/logger";
import { getUserAclList } from "../controllers/role.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/adminlogin", adminLogin);

async function register(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  logger.info({ _from: "/register", ...req.body });

  try {
    if (req.body.inviterCode) {
      const inviterUser = await userCtrl.findUserByCode(req.body.inviterCode);

      req.body.inviter = inviterUser.id;
    }
    delete req.body.inviterCode;
    if (
      !req.body.username ||
      !req.body.password ||
      req.body.password.length < 6
    ) {
      throw new Error(`invalid username or password`);
    }
    let user = await userCtrl.newUser(req.body);
    let savedUser = await userCtrl.findById(user._id);

    savedUser.hashedPassword = "";

    req.user = user;
    let token = authCtrl.generateToken(savedUser);
    res.json({ user, token });
  } catch (err: any) {
    logger.error({ _from: "error", message: err.message });
    next(err);
  }
}

async function login(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  logger.info({ _from: "/login", ...req.body });
  try {
    let user = await userCtrl.login(req.body);
    let token = authCtrl.generateToken(user);
    res.json({ user, token });
  } catch (err: any) {
    logger.error({ _from: "error", message: err.message });
    next(err);
  }
}

async function adminLogin(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  logger.info({ _from: "/adminlogin", ...req.body });

  try {
    let user = await userCtrl.adminLogin(req.body);
    const acls = await getUserAclList(user);
    let token = authCtrl.generateToken(user);
    res.json({
      user,
      token,
      acls,
    });
  } catch (err: any) {
    logger.error({ _from: "error", message: err && err.message });
    next(err);
  }
}

export default router;
