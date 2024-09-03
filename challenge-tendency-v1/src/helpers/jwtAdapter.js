import jwt from 'jsonwebtoken';

const JWT_SEED = process.env.JWT_SEED;

export class JwtAdapter {

  // Lo dejo en 2 horas solo para que se compruebe la eliminación mediante la logica del controlador

  static async generateToken(payload, expiresIn = '2h') {
    try {
      const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SEED, { expiresIn }, (err, token) => {
          if (err) {
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
}
