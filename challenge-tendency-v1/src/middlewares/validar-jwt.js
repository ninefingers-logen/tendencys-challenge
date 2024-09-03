import { AccessToken } from "../database/models/access_token.js";
import { GeneralError } from "../utils/errors/generalError.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */


/**
 * Esta fue una de las partes confusas del ejercicio, o sea no se especifica si la peticion debe pertenecer a un usuario especifico, no hablan de roles
 * Incluso solo dice que cree un inicio de seccion para obtener el token, o sea un registro que obtiene el token
 * Solo dicen que debe existir un token y asumi que se referian a los de la base de datos
 */

export const authMiddleware = async (req, res, next) => {
    try {
        // Extraer el token del header de autorización
        const authHeader = req.headers['authorization'];
        if (!authHeader)
            return next(GeneralError.unauthorized('No token provided'));


        // El formato esperado es "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token)
            return next(GeneralError.unauthorized('Invalid token format'));


        // Buscar el token en la base de datos
        const accessToken = await AccessToken.findOne({ where: { token } });
        if (!accessToken)
            return next(GeneralError.unauthorized('Invalid token'));


        // Si llegamos aquí, el token es válido, segun las indicaciones
        // Opcionalmente, podemos adjuntar información del usuario a la solicitud
        req.userId = accessToken.user_id;

        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return next(GeneralError.internalServer('Authentication error'));
    }
};