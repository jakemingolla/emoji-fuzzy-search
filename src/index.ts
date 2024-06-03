import { Elysia } from "elysia";
import emoji from "./routes/emoji";

const app = new Elysia({ prefix: "/api/v1" }).use(emoji).listen(16741);

export type App = typeof app;
