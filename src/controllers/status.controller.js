import connection from "../db/db.js"

async function serverStatus(req, res) {


    try {
        const searchUser = await connection.query(
            `SELECT * FROM users;`
        );
        console.log(searchUser);

        return sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}

export { serverStatus }