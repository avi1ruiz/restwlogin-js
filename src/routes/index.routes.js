import { Router } from "express";
import { renderAbout, renderHome } from "../controllers/index.controllers.js";

const router = Router();

// Muestra pantalla de bienvenida
router.get("/", renderHome);

// Muestra pantalla de información extra?
router.get("/about", renderAbout);

export default router;
