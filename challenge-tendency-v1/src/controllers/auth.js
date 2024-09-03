import { request, response } from 'express';
import { RegisterUserDto } from '../dto/index.js';
import { GeneralError } from '../utils/errors/generalError.js';
// import { Mysql } from '../database/index.js';
// import { add, getById } from '../database/queries/auth.js';
import { registerService } from '../services/auth.js';


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */


export const register = async (req, res = response, next) => {

    try {
        const registerDto = RegisterUserDto.create(req.body);
        registerService(registerDto)
            .then((user) => res.json(user))
            .catch((error) => next(error));


    } catch (error) {
        next(GeneralError.internalServer('Error al registrar usuario', error));
    }
}


