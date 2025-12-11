export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Customer from '@/models/Customer';
import { hashPassword, generateCustomerToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email, password, confirmPassword, name, recommender } = await request.json();

    // Validation
    if (!email || !password || !confirmPassword || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer already exists with this email' },
        { status: 400 }
      );
    }

    // Create new customer
    const hashedPassword = await hashPassword(password);
    const customer = new Customer({
      email,
      password: hashedPassword,
      name,
      recommender: recommender || ''
    });

    await customer.save();

    // Generate token
    const token = generateCustomerToken(customer);

    // Create response
    const response = NextResponse.json(
      { 
        message: 'Customer created successfully',
        customer: {
          id: customer._id,
          email: customer.email,
          name: customer.name
        }
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('customerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}