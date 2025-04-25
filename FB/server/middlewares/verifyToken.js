import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);

  if (!token) {
    return res
      .status(403)
      .json({ message: "Token is missing", success: false });
  }
  try {
    const userData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = userData;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "invalid token", success: false });
  }
};
