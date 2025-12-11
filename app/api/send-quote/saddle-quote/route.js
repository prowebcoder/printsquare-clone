// app/api/send-quote/saddle-quote/route.js
export const dynamic = "force-dynamic";
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
      subject: `New Saddle Stitching Quote - ${formData.selectedSize}`,
      text: formatEmailText(formData),
      html: formatEmailHTML(formData),
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Saddle stitching quote request sent successfully!' 
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
New Saddle Stitching Quote Request

📏 MEASUREMENT & BINDING
Selected Size: ${formData.selectedSize}
${formData.customSize ? `Custom Size: ${formData.customSize.width} x ${formData.customSize.height}` : ''}
Size Unit: ${formData.sizeUnit}
Binding Edge: ${formData.bindingEdge}
Spine Width: ${formData.spineWidth}

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

📦 ADDITIONAL COMPONENTS
${formData.cover?.dustCover ? `
Dust Cover:
- Paper: ${formData.cover.dustCover.paper}
- Weight: ${formData.cover.dustCover.gsm} gsm
- Print Color: ${formData.cover.dustCover.printColor}
- Finish: ${formData.cover.dustCover.finish}
${formData.cover.dustCover.width ? `- Width: ${formData.cover.dustCover.width}` : ''}
${formData.cover.dustCover.height ? `- Height: ${formData.cover.dustCover.height}` : ''}
` : 'Dust Cover: None'}

${formData.inside?.subscriptionCards?.length > 0 ? `
Subscription Cards (${formData.inside.subscriptionCards.length}):
${formData.inside.subscriptionCards.map((card, index) => `
Card ${index + 1}:
- Paper: ${card.paper}
- Weight: ${card.gsm} gsm
- Print Color: ${card.printColor}
- Finish: ${card.finish}
- Position: ${card.position}
${card.position === 'SELECT' ? `- Selected Page: ${card.selectedPage}` : ''}
${card.width ? `- Width: ${card.width}` : ''}
${card.height ? `- Height: ${card.height}` : ''}
`).join('')}
` : 'Subscription Cards: None'}

🔢 QUANTITY & SERVICES
Quantity: ${formData.quantity}
Proof Type: ${formData.options?.proof}
Hole Punching: ${formData.options?.holePunching?.enabled ? formData.options.holePunching.type : 'No'}
Slipcase: ${formData.options?.slipcase || 'No'}
Shrink Wrapping: ${formData.options?.shrinkWrapping?.enabled ? formData.options.shrinkWrapping.type : 'No'}
Direct Mailing: ${formData.options?.directMailing?.enabled ? formData.options.directMailing.type : 'No'}

${formData.options?.addOns?.length > 0 ? `
Add-ons (${formData.options.addOns.length}):
${formData.options.addOns.map(addOn => `- ${addOn.label}: $${addOn.price}`).join('\n')}
` : ''}

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
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .section { margin: 20px 0; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
        .section-title { color: #2d3748; font-weight: bold; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; }
        .section-title::before { content: attr(data-icon); margin-right: 10px; font-size: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
        .item { margin-bottom: 10px; }
        .label { font-weight: 600; color: #4a5568; margin-bottom: 4px; }
        .value { color: #2d3748; }
        .highlight { background: #fef3c7; padding: 20px; border-radius: 8px; border: 2px solid #fbbf24; margin: 20px 0; }
        .addon-tag { display: inline-block; background: #d1fae5; color: #065f46; padding: 4px 12px; border-radius: 20px; margin: 2px 4px; font-size: 12px; }
        .total { font-size: 24px; font-weight: bold; color: #92400e; text-align: center; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px; }
        .subscription-card { background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px solid #bbf7d0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Saddle Stitching Quote Request</h1>
            <p>Professional Saddle Stitched Booklets & Magazines</p>
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
                    <div class="label">Spine Width:</div>
                    <div class="value">${formData.spineWidth}</div>
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

        ${formData.cover?.dustCover ? `
        <div class="section">
            <div class="section-title" data-icon="📄">Dust Cover</div>
            <div class="grid">
                <div class="item">
                    <div class="label">Paper:</div>
                    <div class="value">${formData.cover.dustCover.paper}</div>
                </div>
                <div class="item">
                    <div class="label">Weight:</div>
                    <div class="value">${formData.cover.dustCover.gsm} gsm</div>
                </div>
                <div class="item">
                    <div class="label">Print Color:</div>
                    <div class="value">${formData.cover.dustCover.printColor}</div>
                </div>
                <div class="item">
                    <div class="label">Finish:</div>
                    <div class="value">${formData.cover.dustCover.finish}</div>
                </div>
                ${formData.cover.dustCover.width || formData.cover.dustCover.height ? `
                <div class="item">
                    <div class="label">Dimensions:</div>
                    <div class="value">${formData.cover.dustCover.width || 'N/A'} × ${formData.cover.dustCover.height || 'N/A'}</div>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}

        ${formData.inside?.subscriptionCards?.length > 0 ? `
        <div class="section">
            <div class="section-title" data-icon="🎴">Subscription Cards (${formData.inside.subscriptionCards.length})</div>
            ${formData.inside.subscriptionCards.map((card, index) => `
            <div class="subscription-card">
                <div style="font-weight: bold; margin-bottom: 8px;">Card ${index + 1}</div>
                <div class="grid">
                    <div class="item">
                        <div class="label">Paper:</div>
                        <div class="value">${card.paper}</div>
                    </div>
                    <div class="item">
                        <div class="label">Weight:</div>
                        <div class="value">${card.gsm} gsm</div>
                    </div>
                    <div class="item">
                        <div class="label">Print Color:</div>
                        <div class="value">${card.printColor}</div>
                    </div>
                    <div class="item">
                        <div class="label">Finish:</div>
                        <div class="value">${card.finish}</div>
                    </div>
                    <div class="item">
                        <div class="label">Position:</div>
                        <div class="value">${card.position}</div>
                    </div>
                    ${card.position === 'SELECT' ? `
                    <div class="item">
                        <div class="label">Selected Page:</div>
                        <div class="value">${card.selectedPage}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            `).join('')}
        </div>
        ` : ''}

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

        ${formData.options?.addOns?.length > 0 ? `
        <div class="section">
            <div class="section-title" data-icon="✨">Add-ons (${formData.options.addOns.length})</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${formData.options.addOns.map(addOn => `
                <span class="addon-tag">${addOn.label} (+$${addOn.price})</span>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="highlight">
            <div class="section-title" data-icon="💰">Price Summary</div>
            <div class="total">Total Amount: $${formData.totalAmount}</div>
        </div>

        <div class="footer">
            <p><strong>Measurement Units:</strong></p>
            <p>• Paper Unit: ${formData.paperUnit}</p>
            <p>• Submitted on: ${new Date().toLocaleString()}</p>
            <p>• This is an automated quote request from your Saddle Stitching form</p>
        </div>
    </div>
</body>
</html>
`;
}