import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const cookie = serialize('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0,
            path: '/',
        })
        res.setHeader('Set-Cookie', cookie)
        res.status(200).json({ message: req.body })
    } catch (error: any) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({ error: 'Invalid credentials.' })
        } else {
            res.status(500).json({ error: 'Something went wrong.' })
        }
    }
}