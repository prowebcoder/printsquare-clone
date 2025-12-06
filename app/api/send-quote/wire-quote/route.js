// app/api/send-quote/wire-quote/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required data
    if (!formData || !formData.selectedSize || !formData.quantity) {
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
      subject: `New Wire Binding Quote - ${formData.selectedSize}`,
      text: formatEmailText(formData),
      html: formatEmailHTML(formData),
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Wire binding quote request sent successfully!' 
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
New Wire Binding Quote Request

📏 MEASUREMENT & BINDING
Selected Size: ${formData.selectedSize}
${formData.customSize ? `Custom Size: ${formData.customSize.width} x ${formData.customSize.height}` : ''}
Size Unit: ${formData.sizeUnit}
Binding Edge: ${formData.bindingEdge}
Wire Color: ${formData.wireColor}

📔 COVER SPECIFICATIONS
Paper Type: ${formData.cover?.paper}
Weight: ${formData.cover?.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}
Print Color: ${formData.cover?.color}
Cover Finish: ${formData.cover?.finish}
Cover Fold: ${formData.cover?.fold}
${formData.cover?.foldWidth ? `Fold Width: ${formData.cover.foldWidth}` : ''}

📄 INSIDE PAGES
Page Count: ${formData.inside?.pageCount} pages
Paper Type: ${formData.inside?.paper}
Weight: ${formData.inside?.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}
Print Color: ${formData.inside?.color}

🔢 QUANTITY & SERVICES
Quantity: ${formData.quantity}
Proof Type: ${formData.options?.proof}
Hole Punching: ${formData.options?.holePunching?.enabled ? formData.options.holePunching.type : 'No'}
Slipcase: ${formData.options?.slipcase || 'No'}
Shrink Wrapping: ${formData.options?.shrinkWrapping?.enabled ? formData.options.shrinkWrapping.type : 'No'}
Direct Mailing: ${formData.options?.directMailing?.enabled ? formData.options.directMailing.type : 'No'}

💰 PRICE SUMMARY
Total Amount: $${formData.totalAmount}

Measurement Units:
- Paper Unit: ${formData.paperUnit}
- Submitted on: ${new Date().toLocaleString()}
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
        .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .section { margin: 20px 0; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
        .section-title { color: #2d3748; font-weight: bold; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; }
        .section-title::before { content: attr(data-icon); margin-right: 10px; font-size: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
        .item { margin-bottom: 10px; }
        .label { font-weight: 600; color: #4a5568; margin-bottom: 4px; }
        .value { color: #2d3748; }
        .highlight { background: #f0f9ff; padding: 20px; border-radius: 8px; border: 2px solid #93c5fd; margin: 20px 0; }
        .wire-color { display: inline-block; width: 20px; height: 20px; border-radius: 50%; margin-right: 8px; vertical-align: middle; border: 1px solid #ccc; }
        .total { font-size: 24px; font-weight: bold; color: #1e40af; text-align: center; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Wire Binding Quote Request</h1>
            <p>Professional Wire-O Binding Service</p>
        </div>

        <div class="section">
            <div class="section-title" data-icon="📏">Measurement & Binding</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Selected Size:</div>
                    <div class="value">${formData.selectedSize}</div>
                </div>
                ${formData.customSize ? `
                <div class="item">
                    <div class="label">Custom Dimensions:</div>
                    <div class="value">${formData.customSize.width} × ${formData.customSize.height}</div>
                </div>
                ` : ''}
                <div class="item">
                    <div class="label">Size Unit:</div>
                    <div class="value">${formData.sizeUnit}</div>
                </div>
                <div class="item">
                    <div class="label">Binding Edge:</div>
                    <div class="value">${formData.bindingEdge}</div>
                </div>
                <div class="item">
                    <div class="label">Wire Color:</div>
                    <div class="value">
                        <span class="wire-color" style="background-color: ${getWireColorHex(formData.wireColor)}"></span>
                        ${formData.wireColor}
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title" data-icon="📔">Cover Specifications</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Paper Type:</div>
                    <div class="value">${formData.cover?.paper}</div>
                </div>
                <div class="item">
                    <div class="label">Weight:</div>
                    <div class="value">${formData.cover?.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}</div>
                </div>
                <div class="item">
                    <div class="label">Print Color:</div>
                    <div class="value">${formData.cover?.color}</div>
                </div>
                <div class="item">
                    <div class="label">Cover Finish:</div>
                    <div class="value">${formData.cover?.finish}</div>
                </div>
                <div class="item">
                    <div class="label">Cover Fold:</div>
                    <div class="value">${formData.cover?.fold}</div>
                </div>
                ${formData.cover?.foldWidth ? `
                <div class="item">
                    <div class="label">Fold Width:</div>
                    <div class="value">${formData.cover.foldWidth}</div>
                </div>
                ` : ''}
            </div>
        </div>

        <div class="section">
            <div class="section-title" data-icon="📄">Inside Pages</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Page Count:</div>
                    <div class="value">${formData.inside?.pageCount} pages</div>
                </div>
                <div class="item">
                    <div class="label">Paper Type:</div>
                    <div class="value">${formData.inside?.paper}</div>
                </div>
                <div class="item">
                    <div class="label">Weight:</div>
                    <div class="value">${formData.inside?.weight} ${formData.paperUnit === 'GSM' ? 'gsm' : formData.paperUnit}</div>
                </div>
                <div class="item">
                    <div class="label">Print Color:</div>
                    <div class="value">${formData.inside?.color}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title" data-icon="🔢">Quantity & Additional Services</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Quantity:</div>
                    <div class="value">${formData.quantity}</div>
                </div>
                <div class="item">
                    <div class="label">Proof Type:</div>
                    <div class="value">${formData.options?.proof}</div>
                </div>
                <div class="item">
                    <div class="label">Hole Punching:</div>
                    <div class="value">${formData.options?.holePunching?.enabled ? formData.options.holePunching.type : 'No'}</div>
                </div>
                <div class="item">
                    <div class="label">Slipcase:</div>
                    <div class="value">${formData.options?.slipcase || 'No'}</div>
                </div>
                <div class="item">
                    <div class="label">Shrink Wrapping:</div>
                    <div class="value">${formData.options?.shrinkWrapping?.enabled ? formData.options.shrinkWrapping.type : 'No'}</div>
                </div>
                <div class="item">
                    <div class="label">Direct Mailing:</div>
                    <div class="value">${formData.options?.directMailing?.enabled ? formData.options.directMailing.type : 'No'}</div>
                </div>
            </div>
        </div>

        <div class="highlight">
            <div class="section-title" data-icon="💰">Price Summary</div>
            <div class="total">Total Amount: $${formData.totalAmount}</div>
        </div>

        <div class="footer">
            <p><strong>Measurement Units:</strong></p>
            <p>• Paper Unit: ${formData.paperUnit}</p>
            <p>• Submitted on: ${new Date().toLocaleString()}</p>
            <p>• This is an automated quote request from your Wire Binding form</p>
        </div>
    </div>
</body>
</html>
`;
}

// Helper function to get wire color hex code
function getWireColorHex(color) {
  const colorMap = {
    'BLACK': '#000000',
    'WHITE': '#ffffff',
    'SILVER': '#c0c0c0',
    'GOLD': '#ffd700',
    'TBD': '#cccccc'
  };
  return colorMap[color] || '#cccccc';
}