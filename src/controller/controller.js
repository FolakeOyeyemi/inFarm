const pool = require("../database/db");
const axios = require("axios")
const uuid = require("uuid")

exports.signup = async (req, res) => {
  try {
    const { username, email, googleId, photo} = req.body;
    
    const newUser = pool.query(
      "INSERT INTO  farm_users ( username, email, googleId, photo ) VALUES ( $1, $2, $3, $4) RETURNING *",
      [username, email, googleId, photo ]
    );
    return res.status(201).json({
      message: "User created sucessfully",
      result: newUser.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating new user");
  }
};


exports.createInvestment = async (req, res) => {
  try {
    const { packageName, farmLocation, duration, amountperUnit } = req.body;

    const newInvestment = pool.query(
      "INSERT INTO farm_investments ( packageName, farmLocation, duration, amountPerUnit) VALUES ( $1, $2, $3, $4) RETURNING *",
      [packageName, farmLocation, duration, amountperUnit]
    );
    return res.status(201).json({
      message: "Investment created successfully",
      result: newInvestment.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating investment");
  }
};

exports.getinvestments = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM farm_investments";

    if (req.params.page || req.params.limit) {
      sql += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const data = await Pool.query(sql);

    return res.status(200).json({
      message: "All Investment",
      data: data[0],
    });
  } catch (err) {
    console.log(err);
  }
};



exports.payment = async (req, res) => {
  try {
    

    const ref = uuid.v4();

    // const totalAmount = investmentExists.amountperUnit * numberOfUnits;

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: ref, // Generate a UUID for the transaction reference
        amount: "7800", // Convert the amount to a string
        currency: "NGN",
        redirect_url:
          "https://webhook.site/70af7eea-88a5-4c99-985b-3186e2f9281c",
        meta: {
          consumer_id: uuid.v4(),
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: "desireme456@yopmail.com",
          name: "Oyeyemi Folake",
        },
        customizations: {
          title: "Flutterwave",
          logo: "http://www.w3.org/2000/svg",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );
    console.log(response);

    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
}