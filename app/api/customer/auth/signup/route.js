// app/api/customer/auth/signup/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '@/models/Customer';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email, password, name, phone, address, recommender } = await request.json();
    
    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email: email.toLowerCase().trim() });
    
    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const customer = await Customer.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
      phone: phone?.trim() || '',
      address: address || {},
      recommender: recommender?.trim() || '',
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: customer._id, 
        email: customer.email,
        name: customer.name 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    // Remove password from response
    const customerData = customer.toObject();
    delete customerData.password;

    return NextResponse.json({
      success: true,
      token,
      customer: {
        ...customerData,
        _id: customerData._id.toString(),
        id: customerData._id.toString(),
      },
      message: 'Account created successfully'
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Signup failed' },
      { status: 500 }
    );
  }
}