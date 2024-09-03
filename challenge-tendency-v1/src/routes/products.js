
import { validateSchema } from '../middlewares/validateSchema.js';
import { catalogProductSchema } from '../schemas/index.js';

import {  validarJWT } from '../middlewares/index.js';
import { createProducts, deleteProducts, getProducts, updateProducts } from '../controllers/products.js';

// import { esRoleValido, emailExiste, existeUsuarioPorId } from '../helpers/db-validators';

import { get } from '../controllers/products.js';

/**
 * GET/products
 */

productsRouter.get('/',validateSchema(catalogProductSchema), getProducts  );
// productsRouter.get('/',validateSchema(catalogProductSchema), getProductsById  );

/**
 * POST/products
 */

productsRouter.post('/',validateSchema(catalogProductSchema), createProducts  );

/**
 * PUT/products
 */

productsRouter.put('/:id',validateSchema(catalogProductSchema), updateProducts  );

/**
 * DELETE/products
 */

productsRouter.delete('/:id',validateSchema(catalogProductSchema), deleteProducts  );

export default productsRouter;




// router.post('/',[
//     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
//     check('correo', 'El correo no es válido').isEmail(),
//     check('correo').custom( emailExiste ),
//     // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
//     check('rol').custom( esRoleValido ), 
//     validarCampos
// ], usuariosPost );

// router.delete('/:id',[
//     validarJWT,
//     // esAdminRole,
//     tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
//     check('id', 'No es un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioPorId ),
//     validarCampos
// ],usuariosDelete );

// router.patch('/', usuariosPatch );





