import { UserTokenObject } from '@/pages/api/users/authenticate';
import { VerifyTokenResponse } from '@/pages/api/users/verify-token';
import { JwtPayload, verify } from 'jsonwebtoken';

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

function getVerifiedToken() {
  return new Promise<(UserTokenObject & JwtPayload) | null>((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      resolve(null);
    } else {
      fetch('/api/users/verify-token', {
        method: 'POST',
        body: JSON.stringify(token),
      })
        .then((res) => res.json())
        .then((res: VerifyTokenResponse) => {
          const userToken = res.userToken as JwtPayload & UserTokenObject;
          if (res.success && userToken.username) {
            resolve(userToken);
          } else {
            resolve(null);
          }
        })
        .catch((err) => reject(err));
    }
  });
}

export { verifyToken, getVerifiedToken };
