// app/api/send-quote/hard-quote/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Format the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nehabhardwaz.gtl@gmail.com',
      subject: `New Hardcover Book Quote - ${formData.sizeUnit === 'INCH' ? formData.selectedSize : 'Custom Size'}`,
      text: formatEmailText(formData),
      html: formatEmailHTML(formData),
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Format plain text email
function formatEmailText(formData) {
  return `
New Hardcover Book Quote Request

Measurement Form Details:

Size & Dimensions: ${formData.selectedSize}${formData.customSize ? ` (Custom: ${formData.customSize.width} x ${formData.customSize.height})` : ''}

Binding Details
Spine Type: ${formData.spineType}
Spine Width: ${formData.spineWidth}
Headband Color: ${formData.headband.color || 'Not selected'}
Bookmark: ${formData.headband.bookmark || 'No'}

Cover Specifications
Paper Type: ${formData.cover.paper}
Weight: ${formData.cover.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}
Print Color: ${formData.cover.color}

Inside Pages
Page Count: ${formData.inside.pageCount} pages
Paper Type: ${formData.inside.paper}
Weight: ${formData.inside.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}
Print Color: ${formData.inside.color}

${formData.dustCover ? `
Dust Cover:
- Width: ${formData.dustCover.width || 'Not specified'}
- Height: ${formData.dustCover.height || 'Not specified'}
- Paper: ${formData.dustCover.paper}
- Weight: ${formData.dustCover.gsm} gsm
- Print Color: ${formData.dustCover.printColor}
- Finish: ${formData.dustCover.finish}
` : 'Dust Cover: Not selected'}

Quantity: ${formData.quantity}

Additional Services
Proof Type: ${formData.options.proof}
${formData.options.holePunching.enabled ? `Hole Punching: ${formData.options.holePunching.type}` : 'Hole Punching: No'}
${formData.options.slipcase ? `Slipcase: ${formData.options.slipcase}` : 'Slipcase: No'}
${formData.options.shrinkWrapping.enabled ? `Shrink Wrapping: ${formData.options.shrinkWrapping.type}` : 'Shrink Wrapping: No'}
${formData.options.directMailing.enabled ? `Direct Mailing: ${formData.options.directMailing.type}` : 'Direct Mailing: No'}

Total Amount: $${formData.totalAmount}

Measurement Units:
- Size Unit: ${formData.sizeUnit}
- Paper Unit: ${formData.paperUnit}
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
        .header { background: #f4f4f4; padding: 20px; text-align: center; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
        .section-title { color: #2c5282; font-weight: bold; margin-bottom: 10px; }
        .row { display: flex; margin-bottom: 5px; }
        .label { font-weight: bold; width: 200px; }
        .value { flex: 1; }
        .highlight { background: #e6fffa; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Hardcover Book Quote Request</h1>
        <p>Measurement Form Submission</p>
    </div>

    <div class="section">
        <div class="section-title">📏 Size & Dimensions</div>
        <div class="row">
            <div class="label">Selected Size:</div>
            <div class="value">${formData.selectedSize}</div>
        </div>
        ${formData.customSize ? `
        <div class="row">
            <div class="label">Custom Dimensions:</div>
            <div class="value">${formData.customSize.width} x ${formData.customSize.height}</div>
        </div>
        ` : ''}
        <div class="row">
            <div class="label">Size Unit:</div>
            <div class="value">${formData.sizeUnit}</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">📖 Binding Details</div>
        <div class="row">
            <div class="label">Spine Type:</div>
            <div class="value">${formData.spineType}</div>
        </div>
        <div class="row">
            <div class="label">Spine Width:</div>
            <div class="value">${formData.spineWidth}</div>
        </div>
        <div class="row">
            <div class="label">Headband Color:</div>
            <div class="value">${formData.headband.color || 'Not selected'}</div>
        </div>
        <div class="row">
            <div class="label">Bookmark:</div>
            <div class="value">${formData.headband.bookmark || 'No'}</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">📔 Cover Specifications</div>
        <div class="row">
            <div class="label">Paper Type:</div>
            <div class="value">${formData.cover.paper}</div>
        </div>
        <div class="row">
            <div class="label">Weight:</div>
            <div class="value">${formData.cover.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}</div>
        </div>
        <div class="row">
            <div class="label">Print Color:</div>
            <div class="value">${formData.cover.color}</div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">📄 Inside Pages</div>
        <div class="row">
            <div class="label">Page Count:</div>
            <div class="value">${formData.inside.pageCount} pages</div>
        </div>
        <div class="row">
            <div class="label">Paper Type:</div>
            <div class="value">${formData.inside.paper}</div>
        </div>
        <div class="row">
            <div class="label">Weight:</div>
            <div class="value">${formData.inside.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}</div>
        </div>
        <div class="row">
            <div class="label">Print Color:</div>
            <div class="value">${formData.inside.color}</div>
        </div>
    </div>

    ${formData.dustCover ? `
    <div class="section">
        <div class="section-title">📄 Dust Cover Settings</div>
        <div class="row">
            <div class="label">Width:</div>
            <div class="value">${formData.dustCover.width || 'Not specified'}</div>
        </div>
        <div class="row">
            <div class="label">Height:</div>
            <div class="value">${formData.dustCover.height || 'Not specified'}</div>
        </div>
        <div class="row">
            <div class="label">Paper:</div>
            <div class="value">${formData.dustCover.paper}</div>
        </div>
        <div class="row">
            <div class="label">Weight:</div>
            <div class="value">${formData.dustCover.gsm} gsm</div>
        </div>
        <div class="row">
            <div class="label">Print Color:</div>
            <div class="value">${formData.dustCover.printColor}</div>
        </div>
        <div class="row">
            <div class="label">Finish:</div>
            <div class="value">${formData.dustCover.finish}</div>
        </div>
    </div>
    ` : ''}

    <div class="section">
        <div class="section-title">🔢 Quantity & Additional Services</div>
        <div class="row">
            <div class="label">Quantity:</div>
            <div class="value">${formData.quantity}</div>
        </div>
        <div class="row">
            <div class="label">Proof Type:</div>
            <div class="value">${formData.options.proof}</div>
        </div>
        <div class="row">
            <div class="label">Hole Punching:</div>
            <div class="value">${formData.options.holePunching.enabled ? formData.options.holePunching.type : 'No'}</div>
        </div>
        <div class="row">
            <div class="label">Slipcase:</div>
            <div class="value">${formData.options.slipcase || 'No'}</div>
        </div>
        <div class="row">
            <div class="label">Shrink Wrapping:</div>
            <div class="value">${formData.options.shrinkWrapping.enabled ? formData.options.shrinkWrapping.type : 'No'}</div>
        </div>
        <div class="row">
            <div class="label">Direct Mailing:</div>
            <div class="value">${formData.options.directMailing.enabled ? formData.options.directMailing.type : 'No'}</div>
        </div>
    </div>

    <div class="highlight">
        <div class="section-title">💰 Total Amount</div>
        <h2>$${formData.totalAmount}</h2>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #f7fafc; font-size: 12px; color: #666;">
        <p><strong>Measurement Units:</strong></p>
        <p>• Size Unit: ${formData.sizeUnit}</p>
        <p>• Paper Unit: ${formData.paperUnit}</p>
        <p>• Submitted on: ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>
`;
}