import { AccessToken } from "../database/models/access_token.js";
import { User } from "../database/models/users.js";
import { JwtAdapter } from "../helpers/jwtAdapter.js";
import { scheduleJob } from "../helpers/scheduleAdapter.js";
import { GeneralError } from "../utils/errors/generalError.js";



export const registerService = async (data) => {

  try {

    // 1. Validar si el usuario ya existe

    // 2. Crear usuario en base de datos
    const newUser = await User.create(data);
    if (!newUser)
      throw GeneralError.internalServer('Failed to create user', 'Database error');


    // 3. Generar token
    const token = await JwtAdapter.generateToken({ id: newUser.id }, '24h');
    if (!token)
      throw GeneralError.internalServer('Failed to generate token', 'JWT error');

    // 4. Guardar token en base de datos
    const newAccessToken = await AccessToken.create({ user_id: newUser.id, token })
    if (!newAccessToken)
      throw GeneralError.internalServer('Failed to create access token', 'Database error');

    // 5.  Programar la eliminación del token después de 1 hora de creado

    const deleteDelay = 10 * 1000; // 10 segundos en milisegundos
    scheduleJob(deleteDelay, async () => {
      try {
        const deletedCount = await AccessToken.destroy({
          where: { id: newAccessToken.id }
        });
        if (deletedCount > 0) {
          console.log(`Token ${newAccessToken.id} eliminado después de 10 segundos`);
        } else {
          console.log(`Token ${newAccessToken.id} no encontrado o ya fue eliminado`);
        }
      } catch (error) {
        console.error(`Error al eliminar el token ${newAccessToken.id}:`, error);
        throw GeneralError.internalServer('Failed to delete access token', error);
      }
    });


    return {
      message: 'User created successfully',
      user: newUser,
      token
    };

  } catch (error) {
    throw GeneralError.internalServer('Failed to create user', error);
  }

}


