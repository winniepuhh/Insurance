const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const configs = require('./configs');

const pool = new sql.ConnectionPool(configs.dbConfig);
const poolConnect = pool.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', async(req, res) =>{
  const {firstName, lastName, email, gender, birth, phone, password} = req.body;

  if(!firstName || !lastName || !email || !gender || !birth || !phone || !password)
  {
    res.status(403).json({ error: "All fields is required!"});
  }

  await poolConnect;

  try{
      var user = await pool
        .request()
        .query(`SELECT Email, [Password] FROM [User] WHERE Email = '${email}'`);

    if(user.recordset.length !== 0){
      res.status(404).json({ error: "User already exists!"});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool
      .request()
      .query(`INSERT INTO [User] (FirstName, LastName, Email, Gender, Birth, Phone, [Password])
        VALUES ('${firstName}', '${lastName}', '${email}', '${gender}', '${birth}', '${phone}', '${passwordHash}')`);

      jwt.sign(
        { user: email },
        configs.jwt_Super_Puper_Duper_Mega_Secret,
        {
          expiresIn: "1hr"
        },
        function(err, token) {
          if (err) {
            console.log(err);
            res.status(500);
          } else {
            res.status(200).json({ data: token });
          }
        }
      );
  }
  catch(err){
    console.log(err);
    res.status(500);
  }
});

app.post('/signin', async(req, res) =>{
  const { email, password } = req.body;

    if(!email || !password)
  {
    res.status(403).json({ error: "All fields is required!"});
  }

  await poolConnect;
  try{
    var user = await pool
      .request()
      .query(`SELECT Email, [Password] FROM [User] WHERE Email = '${email}'`);

    if(user.recordset.length === 0){
      res.status(404).json({ error: "User does not exists!"});
    }

    jwt.sign(
      { user: email },
      configs.jwt_Super_Puper_Duper_Mega_Secret,
      {
        expiresIn: "1hr"
      },
      function(err, token) {
        if (err) {
          console.log(err);
          res.status(500);
        } else {
          res.status(200).json({ data: token });
        }
      }
    );
  }
  catch(err){
    console.log(err);
    res.status(500);
  }
});

app.post('/tourism', async(req, res) =>{
  const { tourism, amountOfDays, amountOfTrips, startDay, endDay, goal, userEmail, token } = req.body;

  if(!tourism || !amountOfDays || !amountOfTrips || !startDay || !endDay || !goal || !userEmail || !token)
  {
    res.status(403).json({ error: "All fields is required!"});
  }

  jwt.verify(token, configs.jwt_Super_Puper_Duper_Mega_Secret, {}, (err, decoded) => {
    if (err) {
      res.status(401);
    }
  });

  await poolConnect;
  try{
    await pool
      .request()
      .query(`INSERT INTO TourismForm (Tourism, AmountOfDays, AmountOfTrips, StartDay, EndDay, Goal, UserEmail)
        VALUES('${tourism}', ${amountOfDays}, ${amountOfTrips}, '${startDay}', '${endDay}', '${goal}', '${userEmail}')`);

    res.send(200);
  }
  catch(err){
    console.log(err);
    res.status(500);
  }
});

app.post('/callMe', async(req, res) =>{
  const { phone, reason } = req.body;

  if(!phone || !reason)
  {
    res.status(403).json({ error: "All fields is required!"});
  }

  await poolConnect;
  try{
    await pool
      .request()
      .query(`INSERT INTO CallMe (Phone, Reason)
        VALUES('${phone}', '${reason}')`);

    res.send(200);
  }
  catch(err){
    console.log(err);
    res.status(500);
  }
});

app.post('/orders', async(req, res) =>{
  const { token, userEmail } = req.body;

  jwt.verify(token, configs.jwt_Super_Puper_Duper_Mega_Secret, {}, (err, decoded) => {
    if (err) {
      res.status(401);
    }
  })

  await poolConnect;
  try{
      const orders = await pool
        .request()
        .query(`SELECT * FROM TourismForm WHERE UserEmail = '${userEmail}'`)

      res.status(200).json({ data: orders.recordset });
  }
  catch(err){
    console.log(err);
    res.status(500);
  }
})

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 
module.exports = app;
