import app from "../index";
import apiRouter from "../routers/apiRouter";

app.use('/api', apiRouter);

export default app;