// import { request, response } from 'express';
// import { RegisterUserDto } from '../dto/index.js';
// import { GeneralError } from '../utils/errors/generalError.js';
// import { registerService } from '../services/auth.js';
// import { AccessToken } from '../database/models/access_token.js';
// import { JwtAdapter } from '../helpers/jwtAdapter.js';
// import { User } from '../database/models/users.js';


// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * 
//  */


// export const register = async (req = request, res = response, next) => {

//     const data = req.body

//     try {
//         // 1. Validar si el usuario ya existe -- este paso no se especifica ya que no se proporciona email y es de sentido comun que los nombres puedan repetirse

//         // 2. Crear usuario en base de datos

//         const newUser = await User.create(data);
//         console.log("🚀 ~ register ~ newUser:", newUser)
//         if (!newUser)
//             return next(GeneralError.internalServer('Failed to create user', error));

//         // 3. Generar token

//         const token = await JwtAdapter.generateToken({ id: newUser.id }, '1h');
//         console.log("🚀 ~ register ~ token:", token)
//         if (!token)
//             return next(GeneralError.internalServer('Failed to generate token', 'JWT error'));

//         // 4. Guardar token en base de datos

//         const newAccessToken = await AccessToken.create({ user_id: newUser.id, token })
//         console.log("🚀 ~ register ~ newAccessToken:", newAccessToken)
//         if (!newAccessToken)
//             return next(GeneralError.internalServer('Failed to create access token', 'Database error'));

//         // 5.  Programar la eliminación del token después de 1 hora de creado

//         const deleteDelay = 60 * 60 * 1000; // 1 hora en milisegundos
//         scheduleJob(deleteDelay, async () => {
//             try {
//                 const deletedCount = await AccessToken.destroy({
//                     where: { id: newAccessToken.id }
//                 });
//                 if (deletedCount > 0) {
//                     console.log(`Token ${newAccessToken.id} eliminado después de 1 hora`);
//                 } else {
//                     console.log(`Token ${newAccessToken.id} no encontrado o ya fue eliminado`);
//                 }
//             } catch (error) {
//                 console.error(`Error al eliminar el token ${newAccessToken.id}:`, error);
//                 return next(GeneralError.internalServer('Failed to delete access token', error));
//             }
//         });

//         return res.json({ newUser });

//     } catch (error) {
//         return next(GeneralError.internalServer('Error al registrar usuarioaaaa', error));
//     }
// }


import { request, response } from 'express';
import { GeneralError } from '../utils/errors/generalError.js';
import { User } from '../database/models/users.js';
import { AccessToken } from '../database/models/access_token.js';
import { JwtAdapter } from '../helpers/jwtAdapter.js';
import { scheduleJob } from 'node-schedule'; // Asegúrate de importar esta función

export const register = async (req = request, res = response, next) => {
    const data = req.body;

    try {
        // 1. Crear usuario en base de datos
        const newUser = await User.create(data);
        if (!newUser) {
            throw new Error('Failed to create user');
        }

        // 2. Generar token
        const token = await JwtAdapter.generateToken({ id: newUser.id }, '1h');
        if (!token) {
            throw new Error('Failed to generate token');
        }

        // 3. Guardar token en base de datos
        const newAccessToken = await AccessToken.create({ user_id: newUser.id, token });
        if (!newAccessToken) {
            throw new Error('Failed to create access token');
        }

        // 4. Programar la eliminación del token después de 1 hora de creado
        // const deleteDelay = 60 * 60 * 1000; // 1 hora en milisegundos
        const deleteDelay = 10 * 1000; // 5 segundos
        scheduleJob(new Date(Date.now() + deleteDelay), async () => {
            try {
                const deletedCount = await AccessToken.destroy({
                    where: { id: newAccessToken.id }
                });
                if (deletedCount > 0) {
                    console.log(`Token ${newAccessToken.id} eliminado después de 1 hora`);
                } else {
                    console.log(`Token ${newAccessToken.id} no encontrado o ya fue eliminado`);
                }
            } catch (error) {
                console.error(`Error al eliminar el token ${newAccessToken.id}:`, error);
            }
        });

        // 5. Enviar respuesta
        return res.status(201).json({ 
            message: 'User registered successfully',
            user: newUser,
            token: token
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        return next(GeneralError.internalServer('Error al registrar usuario', error.message));
    }
};