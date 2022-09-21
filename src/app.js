import cookieParser from 'cookie-parser'
import express from 'express'
import { create } from 'express-handlebars'
import morgan from 'morgan'
import indexRoutes from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import booksRoutes from './routes/books.routes.js'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

//Inicializar express
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3000);

app.set('views', join(__dirname, 'views'));
app.engine('.hbs', create({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: 'hbs'
}).engine);
app.set('view engine', '.hbs')

//Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Rutas
app.use(indexRoutes)
app.use(authRoutes)
app.use(booksRoutes)

//Servidor
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

export default server;