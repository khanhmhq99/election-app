import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from 'cookie';
import { redirect } from "next/navigation";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const cookie = serialize('session', req.body.address, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        })
        res.setHeader('Set-Cookie', cookie)
        res.status(200).json({ message: req.body });
        redirect("/dashboard");
    } catch (error: any) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({ error: 'Invalid credentials.' })
        } else {
            res.status(500).json({ error: 'Something went wrong.' })
        }
    }
}