import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.listen(process.env.PORT, () => 
    console.log(`Magic happens on port ${process.env.PORT}`)
);