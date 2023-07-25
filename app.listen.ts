import app from "./index";
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log('Server is listening at port ' + process.env.PORT);
});