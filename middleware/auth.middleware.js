import jwt from "jsonwebtoken";

/* 
  This block of code is for restricting unauthenticated users
*/

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ Message: "No token provided" });
      }

      const payload = jwt.verify(token, "1211889978");
      req.admin = payload.user;
      req.exeat = payload.exeat;

      next();
    } else {
      return res.status(401).json({ Message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

export const getDean = async (req, res, next) => {
  try {
    if (!req.admin || req.admin.role !== "Dean") {
      return res.status(403).json({ msg: "Not authorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default validateToken;
