import jwt from "jsonwebtoken";

export function generateAccessToken(user: any) {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
}

export function generateRefreshToken(user: any) {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
}