import { Router } from "express";
import {
   addBook,
   deleteBook,
   editBook,
   renderAdd,
   renderBooks,
   renderEditBook,
   verifyCookie,
} from "../controllers/books.controllers.js";

const router = Router();

// Todas las rutas estan protegidas con la verificación del token enviado a traves de una cookie

// Mostrar libros del usuario
router.get("/books", verifyCookie, renderBooks);

// Agregar libros
router.get("/books/add", verifyCookie, renderAdd);
router.post("/books/add", verifyCookie, addBook);

// Eliminar libros
router.post("/books/delete/:id", verifyCookie, deleteBook);

// Editar libro
router.get("/books/edit/:id", verifyCookie, renderEditBook);
router.post("/books/edit/:id", verifyCookie, editBook);

export default router;
