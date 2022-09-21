import Book from "../models/books.js";
import jwt from "jsonwebtoken";

// Middleware
export const verifyCookie = (req, res, next) => {
   // Tomamos el token de la cookie enviada por la ruta /singin
   const { token } = req.cookies;

   // Verificamos el token, si es valido avanzamos, si no, redirigimos al login
   jwt.verify(token, "secret", (err, decoded) => {
      err ? res.redirect("/signin") : next();
   });
};

export const renderBooks = async (req, res) => {
   // Tomamos la cookie user
   const { user } = req.cookies;

   // Buscamos los libros asociados al usuario
   const books = await Book.find({ username: user }).lean();

   // Imprimimos en pantalla
   res.render("pages/books/books.hbs", { books, user });
};

export const renderAdd = (req, res) => {
   res.render("pages/books/newBook.hbs");
};

export const addBook = (req, res) => {
   // Tomamos datos del formulario y de la cookie usuario
   const { title, author, photo_dir, rate } = req.body;
   const { user } = req.cookies;

   // Creamos un nuevo libro con los datos
   const newBook = new Book({
      username: user,
      title: title,
      author: author,
      rate: rate,
      photo_dir: photo_dir,
   });

   // Lo guardamos
   newBook.save((err) => {
      if (err) return console.log(err);
   });

   res.redirect("/books");
};

export const deleteBook = async (req, res) => {
   const { id } = req.params;

   await Book.findByIdAndDelete(id);

   res.redirect("/books");
};

export const renderEditBook = async (req, res) => {
   const { id } = req.params;

   const bookEdit = await Book.findById(id).lean();

   res.render("pages/books/updateBook.hbs", { book: bookEdit });
};

export const editBook = async (req, res) => {
   const { id } = req.params;
   const { title, author, rate, photo_dir } = req.body;

   const bookEdited = {
      title: title,
      author: author,
      rate: rate,
      photo_dir: photo_dir,
   };

   await Book.findByIdAndUpdate(id, bookEdited);

   res.redirect("/books");
};
