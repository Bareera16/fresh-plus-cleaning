import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Route Handler to verify reCAPTCHA v3 tokens
 * This keeps your secret key secure on the backend
 */
export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({
                success: false,
                error: 'reCAPTCHA token is required'
            }, { status: 400 });
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        if (!secretKey) {
            console.error('RECAPTCHA_SECRET_KEY is not configured');
            return NextResponse.json({
                success: false,
                error: 'Server configuration error'
            }, { status: 500 });
        }

        // Verify token with Google
        const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
        const verificationResponse = await fetch(verificationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });

        const verificationData = await verificationResponse.json();

        // Check if verification was successful
        if (!verificationData.success) {
            return NextResponse.json({
                success: false,
                score: 0,
                error: 'reCAPTCHA verification failed',
                details: verificationData['error-codes'],
            }, { status: 400 });
        }

        // reCAPTCHA v3 returns a score between 0.0 (bot) and 1.0 (human)
        const score = verificationData.score || 0;
        const action = verificationData.action || '';

        // Lenient threshold: 0.5 (recommended for customer-facing forms)
        const SCORE_THRESHOLD = 0.5;

        if (score < SCORE_THRESHOLD) {
            return NextResponse.json({
                success: false,
                score,
                action,
                error: 'Bot detected. Please try again or contact us directly.',
            }, { status: 400 });
        }

        // Success! User is verified as human
        return NextResponse.json({
            success: true,
            score,
            action,
            message: 'Verification successful',
        });

    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error during verification',
        }, { status: 500 });
    }
}
