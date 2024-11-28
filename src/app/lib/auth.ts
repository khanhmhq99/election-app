import { cookies } from "next/headers";

export async function login(data: {
    adress: string;
}) {

    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);

    // Save the session in a cookie
    (await cookies()).set("session", data.adress, { expires, httpOnly: true });
}