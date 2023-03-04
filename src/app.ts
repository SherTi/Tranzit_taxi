import express, { Request, Response } from 'express';
import cors from 'cors';
import { create } from "express-handlebars";
import * as path from "path";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./db";
import "./model"
import router from "./routes/router";

const app = express();
dotenv.config();
app.enable("trust proxy");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '..', '/static/tmp')
}));

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '..', 'views/layouts/'),
    partialsDir: [path.join(__dirname, '..', 'views/partials')],
    helpers: {
        if_eq: (a: any, b: string, options: any) => {
            if (a == b) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        concat: (...strings: any) => {
            let con: string = '';
            for (let i = 0; i < strings.length; i++) {
                if (i != strings.length - 1) {
                    con += `${strings[i]}`;
                }
            }
            return con
        },
        includes: (a: string, b: string, options: any) => {
            if (a.includes(b)) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('views', ['views', 'views/pages']);
app.set('view engine', 'hbs');
app.disable('x-powered-by');
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(router);

app.use(async (req: Request, res: Response) => {
    try {
        if (req.headers.accept?.includes("html")) {
            res.status(404).render('404');
        } else {
            res.status(404).send()
        }
    } catch (e) {
        res.status(500).render('error');
    }
});

const start = () => {
    db.authenticate().then(() => {
        db.sync().then(() => {
            app.listen((process.env.PORT as any) || 4300, process.env.HOST || "localhost", () => {
                console.log(`Сервер запустился на: http://${process.env.HOST}:${ process.env.PORT }`);
            });
        });
    });
}

start();
