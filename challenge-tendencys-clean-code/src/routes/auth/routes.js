import { Router } from "express";


export class AuthRoutes {

  static get routes() {

    const router = Router();

    router.get('/', (req, res) => {

      res.send('auth!!aaaaaaaaaaaaaaaaaaaa!')
    })

    return router
  }

}