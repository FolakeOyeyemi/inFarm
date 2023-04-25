const pool = require("../database/db")

exports.createInvestment = async (req, res) => {
    try {
      const { packageName, farmLocation, duration, amountperUnit } = req.body;
      
      const newInvestment = pool.query("INSERT INTO investmentRecords ( packageName, farmLocation, duration, amountPerUnit) VALUES ( $1, $2, $3, $4) RETURNING *",
      [ packageName, farmLocation, duration, amountperUnit ]
      );
      return res.status(201).json({
        message: "Investment created successfully",
        result: newInvestment.rows[0]
      })
        
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating investment');
    }
  }

  exports.makepayment = async (req, res) => {
    try {
        const { numberOfUnits, email, } = req.body
        const investmentExists = await pool.query("SELECT * FROM investmentRecords WHERE id = ?");

        const ref = uuid.v4();

        const totalAmount = investmentExists.amountperUnit * numberOfUnits

        const response = await axios.post(
            "https://api.flutterwave.com/v3/payments",
            {
                tx_ref: ref,
                amount: totalAmount,
                currency: "NGN",
                redirect_url:
                "localhost://1234",
                customer: {
                    email,
                    name: investmentExists.packageName
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
                }
            }
        );

        if (response.data.status === "successful") {
          const newPurchase = await pool.query(
            "INSERT INTO transaction (tx_ref, amount, email, name) VALUES ($1, $2, $3, $4) RETURNING *",
            [ref, totalAmount, email, investmentExists.packageName]
          );
        }
        
        
    } catch (error) {
        
    }
  }