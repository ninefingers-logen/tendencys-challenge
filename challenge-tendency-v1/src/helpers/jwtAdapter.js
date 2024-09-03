import jwt from 'jsonwebtoken';

const JWT_SEED = process.env.JWT_SEED;

export class JwtAdapter {

  static async generateToken(payload, expiresIn = '3h') {
    try {
      const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SEED, { expiresIn }, (err, token) => {
          if (err) {
            console.log('🚀 ~ file: generar-jwt.js:JwtAdapter.generateToken ~ err:', err)
            reject(err);
          } else {
            resolve(token);
          }
        });
      });
      return token;
    } catch (error) {
      return null;
    }
  }

  static async validateToken(token) {
    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SEED, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
