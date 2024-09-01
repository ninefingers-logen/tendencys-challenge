import { Router } from "express";
import { AuthRoutes } from "./routes/index.js";



export class AppRoutes {

  static get routes() {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes)


    // router.use('/api/users', [Auth.validateJWT], UserRoutes.routes);


    /**
     * Aqui debajo irían el resto de rutas que fueran necesarias
     * por ejemplo:
     */


    // router.use('/api/products', ProductRoutes.routes);

    // router.use('/api/cart', CartRoutes.routes);

    // router.use('/api/categories', CategoryRoutes.routes);

    // router.use('/api/addresses', AddressesRoutes.routes);

    return router;
  }
}