import connection from "../db/db.js"
import { v4 as uuid } from 'uuid'
import { signInSchema } from '../schemas/authSchema.js'
import joi from 'joi';

async function userSignup(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const requestData = req.body;

    const validateRequest = signInSchema.validate(requestData, { abortEarly: false });
    if (validateRequest.error) {
        return res.status(422).send(validateRequest.error);
    }

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
            [name, email, hashedPassword]
        );

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const searchUser = await connection.query(
            `SELECT * FROM users WHERE email = $1;`,
            [email]
        );

        if (searchUser.rowCount === 0) {
            return res.sendStatus(404);
        }
        const isValidPassword = bcrypt.compareSync(password, searchUser.password);

        if (isValidPassword) {
            const token = uuid();
            const newSession = await connection.query(
                `INSERT INTO sessions (token, user_id, created_at) VALUES ($1, $2);`,
                [token, userId]
            );
        }

    } catch (error) {
        return res.sendStatus(500);
    }
}

export { userSignup }