const express = require('express');
const app = express();
const port = process.eventNames.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const loginRoutes = require('./routers/loginRouter');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/auth",loginRoutes);

app.listen(port, () => {
  console.log(`Example app listening at the port: ${port}`);
});