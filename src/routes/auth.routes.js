import { Router } from "express";
import {
   renderSignIn,
   renderSignUp,
   signinFunc,
   signoutFunc,
   signupFunc,
} from "../controllers/auth.controllers.js";

const router = Router();

// Rutas para registrar un usuario
router.get("/signup", renderSignUp);
router.post("/signup", signupFunc);

// Rutas para inicio de sesión
router.get("/signin", renderSignIn);
router.post("/signin", signinFunc);

// Ruta para cerrar sesión
router.post("/signout", signoutFunc);

export default router;
