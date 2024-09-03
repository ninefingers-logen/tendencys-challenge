import { GeneralError } from '../utils/errors/generalError.js';
import { User } from '../database/models/users.js';
import { AccessToken } from '../database/models/access_token.js';
import { JwtAdapter } from '../helpers/jwtAdapter.js';
import { scheduleJob } from 'node-schedule';

// node-schedule fue utilizado para programar la eliminación de tokens, ya que es mas preciso con fechas especificas


export const register = async (req, res, next) => {
    const data = req.validProducts || req.validatedData; // Usa los datos validados del middleware

    try {
        let createdUsers = [];
        let tokens = [];

        // Función para crear un usuario y su token
        const createUserAndToken = async (userData) => {
            const newUser = await User.create(userData);
            if (!newUser) {
                throw new Error('Failed to create user');
            }

            const token = await JwtAdapter.generateToken({ id: newUser.id }, '1h'); 
            if (!token) {
                throw new Error('Failed to generate token');
            }

            const newAccessToken = await AccessToken.create({ user_id: newUser.id, token });
            if (!newAccessToken) {
                throw new Error('Failed to create access token');
            }

            // Programar la eliminación del token
            const deleteDelay = 60 * 60 * 1000; // 1 hora en milisegundos - por motivos didacticos deberia ponerse en 20 segundos para probar
            scheduleJob(new Date(Date.now() + deleteDelay), async () => {
                try {
                    await AccessToken.destroy({ where: { id: newAccessToken.id } });
                    console.log(`Token ${newAccessToken.id} eliminado después de 1 hora`);
                } catch (error) {
                    console.error(`Error al eliminar el token ${newAccessToken.id}:`, error);
                }
            });

            return { user: newUser, token };
        };

        // Manejar registro único o múltiple(bulk)
        if (Array.isArray(data)) {
            for (const userData of data) {
                const result = await createUserAndToken(userData);
                createdUsers.push(result.user);
                tokens.push(result.token);
            }
        } else {
            const result = await createUserAndToken(data);
            createdUsers = [result.user];
            tokens = [result.token];
        }

        // Enviar respuesta
        return res.status(201).json({ 
            message: 'User(s) registered successfully',
            users: createdUsers,
            tokens: tokens
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        return next(GeneralError.internalServer('Error al registrar usuario(s)', error.message));
    }
};
