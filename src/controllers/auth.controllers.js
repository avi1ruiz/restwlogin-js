import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sistema de registro
export const renderSignUp = (req, res) => {
   res.render("pages/auth/signup.hbs");
};

export const signupFunc = async (req, res) => {
   // Del formulario de extraen los datos
   const { username, email, password, confirm } = req.body;

   // Se verifica que el nombre de usuario y el email no esten en uso ya, y que la contraseñas coincidan
   const usernameFound = await User.findOne({ username: username });
   const emailFound = await User.findOne({ email: email });

   if (usernameFound) return res.send("Usuario ya en uso");

   if (emailFound) return res.send("email en uso");

   if (password !== confirm) return res.send("Contraseñas no coinciden");

   // Encripta la contraseña
   const passEncrypted = bcrypt.hashSync(password, 10);

   // Se crea un nuevo documento, se guarda en la base
   const userSignUp = new User({
      username: username,
      email: email,
      password: passEncrypted,
   });

   userSignUp.save((err) => {
      if (err) return console.log(err);
   });

   res.redirect("/signin");
};

// Sistema de Inicio de sesión

export const renderSignIn = (req, res) => {
   res.render("pages/auth/signin");
};

export const signinFunc = async (req, res) => {
   // Se extraen datos del formulario
   const { email, password } = req.body;

   // Se comprueba que el usuario exista mediante una busqueda con email
   // Nota: se supone solo debería existir un usuario por email registrado
   if (email == '' || password == '') return res.send('campos vacios')
   
   const userFound = await User.findOne({ email: email });
   const passMatch = bcrypt.compare(password, userFound.password);

   if (!userFound || !passMatch)
      return res.send("correo o contraseña erroneos");

   /*Si la comprobación no arroja errores, se firma un token con el id de la base de datos 
   y el username posteriormente se envian como cookies*/
   const token = jwt.sign({ username: userFound.username }, "secret");

   res.cookie("token", token)
      .cookie("user", userFound.username)
      .redirect("/books");
};

export const signoutFunc = (req, res) => {
   // Se limpian las cookies
   res.clearCookie("token").clearCookie("user").redirect("/");
};
