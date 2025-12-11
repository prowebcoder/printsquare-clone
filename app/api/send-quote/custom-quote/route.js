// app/api/send-quote/custom-quote/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required data
    if (!formData || !formData.project_name || !formData.customer_email) {
      return NextResponse.json(
        { success: false, message: 'Missing required form data' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nehabhardwaz.gtl@gmail.com', // Your email address
      cc: formData.customer_email, // CC to customer
      subject: `Custom Quote Request: ${formData.project_name}`,
      text: formatEmailText(formData),
      html: formatEmailHTML(formData),
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Custom quote request sent successfully!' 
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send quote request' },
      { status: 500 }
    );
  }
}

// Format plain text email
function formatEmailText(formData) {
  return `
📋 CUSTOM QUOTE REQUEST

👤 CUSTOMER INFORMATION
Name: ${formData.customer_name}
Email: ${formData.customer_email}
Customer ID: ${formData.customer_id}

📋 PROJECT DETAILS
Project Name: ${formData.project_name}
Binding Type: ${formData.binding || 'Not specified'}
Finished Size: ${formData.custom_width} × ${formData.custom_height}
Page Count: ${formData.page_in} pages
Quantity: ${formData.quantity}

📍 SHIPPING INFORMATION
Country: ${formData.country}
Zip Code: ${formData.zipcode}

📝 PROJECT DESCRIPTION
${formData.quote_desc}

📅 SUBMISSION DETAILS
Submitted on: ${formData.timestamp ? new Date(formData.timestamp).toLocaleString() : new Date().toLocaleString()}

This is a custom quote request that requires manual pricing calculation.
Please contact the customer with a detailed quote within 1-2 business days.
`;
}

// Format HTML email
function formatEmailHTML(formData) {
  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #E21B36 0%, #c2182b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .section { margin: 20px 0; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
        .section-title { color: #2d3748; font-weight: bold; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; }
        .section-title::before { content: attr(data-icon); margin-right: 10px; font-size: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
        .item { margin-bottom: 10px; }
        .label { font-weight: 600; color: #4a5568; margin-bottom: 4px; font-size: 14px; }
        .value { color: #2d3748; font-size: 15px; }
        .customer-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .project-desc { background: #fff3e0; padding: 20px; border-radius: 8px; border: 1px solid #ffcc80; }
        .urgent { background: #ffebee; padding: 20px; border-radius: 8px; border: 2px solid #ef9a9a; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px; }
        .badge { display: inline-block; background: #ff5722; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Custom Quote Request</h1>
            <p>Manual Pricing Required</p>
            <span class="badge">CUSTOM PROJECT</span>
        </div>

        <div class="customer-info">
            <div class="section-title" data-icon="👤">Customer Information</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Customer Name:</div>
                    <div class="value">${formData.customer_name}</div>
                </div>
                <div class="item">
                    <div class="label">Email:</div>
                    <div class="value">${formData.customer_email}</div>
                </div>
                <div class="item">
                    <div class="label">Customer ID:</div>
                    <div class="value">${formData.customer_id}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title" data-icon="📋">Project Details</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Project Name:</div>
                    <div class="value"><strong>${formData.project_name}</strong></div>
                </div>
                <div class="item">
                    <div class="label">Binding Type:</div>
                    <div class="value">${formData.binding || 'Not specified'}</div>
                </div>
                <div class="item">
                    <div class="label">Finished Size:</div>
                    <div class="value">${formData.custom_width} × ${formData.custom_height}</div>
                </div>
                <div class="item">
                    <div class="label">Page Count:</div>
                    <div class="value">${formData.page_in} pages</div>
                </div>
                <div class="item">
                    <div class="label">Quantity:</div>
                    <div class="value">${formData.quantity}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title" data-icon="📍">Shipping Information</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Country:</div>
                    <div class="value">${formData.country}</div>
                </div>
                <div class="item">
                    <div class="label">Zip Code:</div>
                    <div class="value">${formData.zipcode}</div>
                </div>
            </div>
        </div>

        <div class="project-desc">
            <div class="section-title" data-icon="📝">Project Description</div>
            <div style="white-space: pre-wrap; line-height: 1.6;">${formData.quote_desc || 'No description provided'}</div>
        </div>

        <div class="urgent">
            <div class="section-title" data-icon="⚠️">Important Notes</div>
            <p><strong>This is a custom quote request that cannot be priced automatically.</strong></p>
            <p>Please:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Review the project requirements carefully</li>
                <li>Calculate pricing manually based on specifications</li>
                <li>Contact the customer within 1-2 business days</li>
                <li>Provide detailed quote including setup costs, materials, and shipping</li>
            </ul>
            <p style="margin-top: 10px;"><strong>Submitted on:</strong> ${formData.timestamp ? new Date(formData.timestamp).toLocaleString() : new Date().toLocaleString()}</p>
        </div>

        <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <p>1. Acknowledge receipt of this request to customer</p>
            <p>2. Review specifications and calculate custom pricing</p>
            <p>3. Send detailed quote to customer via email</p>
            <p>4. Follow up within 48 hours</p>
            <p style="margin-top: 20px; font-style: italic;">This email was automatically generated from the Custom Quote form on your website.</p>
        </div>
    </div>
</body>
</html>
`;
}