import connection from "../db/db.js";

async function userSignup( req, res ) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const isNewUser = await connection.query(
            `SELECT * FROM users WHERE email = $1`,
            [email] 
        );

        if (isNewUser.rowCount !== 0) {
            return res.status(409).send('Email já cadastrado!');
        }

        if (password !== confirmPassword) {
            return res.sendStatus(422);
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const signup = connection.query(
            `INSERT INTO users ( name, email, password ) VALUES ($1, $2, $3)`,
            [ name, email, hashedPassword ]
        );

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export { userSignup };