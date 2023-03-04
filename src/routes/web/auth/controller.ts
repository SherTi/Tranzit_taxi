import {Request, Response} from "express";
import routes from "./routes";

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            res.render("register", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ],
                main: true
            })
        } catch (e) {

        }
    }

    async create(req: Request, res: Response) {
        try {
            let {name, surname, birth, gender, phone, email, password, entered_password} = req.body;
            if (!name || !surname || !birth || !gender || !phone || !email || !password || !entered_password) {
                res.redirect("/register?error=Нет необходимых данных!");
                return
            }
            if (!email.includes("@") || !email.includes(".")) {
                res.redirect("/register?error=Отправлены неправильные данные!");
                return
            }
            if (phone.includes("+")) {
                phone = parseInt(phone.replaceAll(/[^0-9]/g, ""));
                if (isNaN(phone)) {
                    res.redirect("/register?error=Отправлены неправильные данные!");
                    return
                }
            }
            if (password.match(/[а-яА-Я]/g)) {
                res.redirect("/register?error=Пароль не должен содержать кириллицу!");
                return
            }
            if (!(password.match(/[a-z]/g)) || !(password.match(/[A-Z]/g)) || !(password.match(/[0-9]/g)) || password.length < 8 || password !== entered_password) {
                res.redirect("/register?error=Пароль не надежен!");
                return
            }
            res.render("register_stage_2", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        } catch (e) {
            console.log(e)
        }
    }

    async submit(req: Request, res: Response) {
        try {
            res.render("register_stage_3", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        } catch (e) {
            console.log(e)
        }
    }

    async reset(req: Request, res: Response) {
        try {
            res.render("password-recovery", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        } catch (e) {
            console.log(e)
        }
    }

    async resetS(req:Request,res:Response){
        try{
            res.render("password-recovery_2", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        }catch (e){
            console.log(e)
        }
    }


    async trip(req:Request,res:Response){
        try{
            res.render("publish-trip", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        }catch (e){
            console.log(e)
        }
    }
    async tripNext(req:Request , res:Response){
        try{
            res.render("publish-trip_2", {
                styles: [
                    "header.css",
                    "register.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        }catch (e) {
            console.log(e)
        }
    }
    async tripNextTwo(req:Request , res:Response){
        try{
            res.render("publish-trip_3", {
                styles: [
                    "header.css",
                    "publish-trip.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        }catch (e) {
            console.log(e)
        }
    }
    async result(req:Request , res:Response){
        try{
            res.render("posts-result", {
                styles: [
                    "header.css",
                    "publish-trip.css",
                    "date-picker.css",
                    "footer.css"
                ]
            })
        }catch (e) {
            console.log(e)
        }
    }
    async historyTravel(req:Request , res:Response){
        try{
            res.render("history-of-travels", {
                styles: [
                    "header.css",
                    "date-picker.css",
                    "filter.css",
                    "footer.css"
                ]
            })
        }catch (e) {
            console.log(e)
        }
    }
}