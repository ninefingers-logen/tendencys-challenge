import { response } from 'express';
// import { compareSync } from 'bcryptjs';

// import Usuario, { findOne } from '../models/usuario';

// import { generarJWT } from '../helpers/generar-jwt';
// import { googleVerify } from '../helpers/google-verify';


// export  const login = async(req, res = response) => {

//     const { correo, password } = req.body;

//     try {
      
//         // Verificar si el email existe
//         const usuario = await findOne({ correo });
//         if ( !usuario ) {
//             return res.status(400).json({
//                 msg: 'Usuario / Password no son correctos - correo'
//             });
//         }

//         // SI el usuario está activo
//         if ( !usuario.estado ) {
//             return res.status(400).json({
//                 msg: 'Usuario / Password no son correctos - estado: false'
//             });
//         }

//         // Verificar la contraseña
//         const validPassword = compareSync( password, usuario.password );
//         if ( !validPassword ) {
//             return res.status(400).json({
//                 msg: 'Usuario / Password no son correctos - password'
//             });
//         }

//         // Generar el JWT
//         const token = await generarJWT( usuario.id );

//         res.json({
//             usuario,
//             token
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             msg: 'Hable con el administrador'
//         });
//     }   

// }


export const register = async(req, res = response) => {

    // const { nombre, correo, password, rol } = req.body;
    // const usuario = new Usuario({ nombre, correo, password, rol });

    res.send('register!!')
}


