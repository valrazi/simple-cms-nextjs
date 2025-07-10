import dayjs from "dayjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {email, password} = body
    if(!email || !password) {
        return NextResponse.json({
            error: 'Email and Password required'
        }, {
            status: 400
        })
    }
    
    const credentials = {
        email: 'admin@example.com',
        password: 'admin'
    }

    if(email != credentials.email || password != credentials.password) {
        return NextResponse.json({
            error: 'Email or Password invalid'
        }, {
            status: 401
        })
    }

    const cookieStore = await cookies()
    const authToken = dayjs().valueOf().toString()
    await cookieStore.set('auth_token', authToken, {
        httpOnly: true,
        maxAge: 86400
    })

    const response = {
        token: authToken,
        user: {
            ...credentials,
            name: 'Admin CMS'
        }
    }

    return NextResponse.json({
        data: response
    }, {
        status: 200
    })
}