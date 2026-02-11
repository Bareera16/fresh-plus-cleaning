import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Route Handler to send quote emails via Resend
 * This follows the archived API logic
 */
export async function POST(req: NextRequest) {
    try {
        const { quoteData } = await req.json();

        if (!quoteData) {
            return NextResponse.json({ error: 'Quote data is required' }, { status: 400 });
        }

        // Use Resend API with a server-side approach
        const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_2kXVnpuG_A4VZQyHV33D3bz7Gr4mySFx1';

        const emailPayload = {
            from: 'FreshPlus Quote System <onboarding@resend.dev>', // Updated fallback to match Resend defaults or onboarding
            to: ['infofreshplusclean@gmail.com'],
            reply_to: quoteData.email,
            subject: `💰 New Quote Request - ${quoteData.name}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Quote Request</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px; }
                .header { background: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: white; padding: 20px; border-radius: 0 0 10px 10px; }
                .detail-row { margin: 10px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #1e40af; }
                .label { font-weight: bold; color: #1e40af; }
                .urgent { background: #dc2626; color: white; padding: 15px; text-align: center; font-weight: bold; margin: 20px 0; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚨 NEW QUOTE REQUEST</h1>
                    <p>FreshPlus Professional Cleaning Services</p>
                </div>
                
                <div class="content">
                    <div class="urgent">
                        ⚡ ACTION REQUIRED: Customer expects quote response within the day
                    </div>
                    
                    <h2>Customer Details:</h2>
                    <div class="detail-row">
                        <span class="label">Name:</span> ${quoteData.name}
                    </div>
                    <div class="detail-row">
                        <span class="label">Email:</span> ${quoteData.email}
                    </div>
                    <div class="detail-row">
                        <span class="label">Phone:</span> ${quoteData.phone1}
                    </div>
                    ${quoteData.phone2 ? `
                    <div class="detail-row">
                        <span class="label">Secondary Phone:</span> ${quoteData.phone2}
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="label">Address:</span> ${quoteData.address}, ${quoteData.city} ${quoteData.postcode}
                    </div>
                    
                    <h2>Service Request:</h2>
                    <div class="detail-row">
                        <span class="label">Services:</span> ${Array.isArray(quoteData.services) ? quoteData.services.join(', ') : quoteData.services}
                    </div>
                    <div class="detail-row">
                        <span class="label">Preferred Date:</span> ${quoteData.preferred_date || 'Not specified'}
                    </div>
                    ${quoteData.job_description ? `
                    <div class="detail-row">
                        <span class="label">Job Description:</span> ${quoteData.job_description}
                    </div>
                    ` : ''}
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p><strong>Please respond to this customer promptly!</strong></p>
                        <p><a href="mailto:${quoteData.email}" style="background: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Customer</a></p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `
        };

        // Send email using fetch to Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Resend API error:', result);
            return NextResponse.json({ error: result.message || 'Failed to send email' }, { status: response.status });
        }

        console.log('✅ Email sent successfully:', result);

        return NextResponse.json({
            success: true,
            message: 'Quote email sent successfully',
            emailId: result.id
        });

    } catch (error: any) {
        console.error('❌ Server email error:', error);

        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to send email',
            fallback: {
                mailto: `mailto:infofreshplusclean@gmail.com?subject=${encodeURIComponent('New Quote Request')}&body=${encodeURIComponent('Email service failed. Please check the website admin panel for quote details.')}`
            }
        }, { status: 500 });
    }
}
