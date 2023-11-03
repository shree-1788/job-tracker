import { verifyJWT } from "../utils/tokenUtils.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    const testUserId = userId === "64ec4c7442e66a351e20df8d";

    req.user = { userId, role, testUserId };

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("not authorized to access the route");
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUserId) throw new BadRequestError("Ready Only User");
};
