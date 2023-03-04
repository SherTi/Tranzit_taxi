import {Request, Response} from "express";

export class PostsController {
    async get(req: Request, res: Response) {
        try {
            res.render("posts", {
                styles: [
                    "header.css",
                    "date-picker.css",
                    "filter.css",
                    "footer.css"
                ]
            });
        } catch (e) {

        }
    }
}