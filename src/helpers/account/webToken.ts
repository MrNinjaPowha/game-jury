import { verify } from 'jsonwebtoken';

const JWTKey = process.env.JWTKey;

function verifyToken(jwtToken: string) {
  if (!JWTKey) return null;

  try {
    return verify(jwtToken, JWTKey);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { verifyToken };
