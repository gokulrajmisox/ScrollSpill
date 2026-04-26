import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const cookieStore = cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { message, userId } = body;

    // SECURITY FIX: Validate that the userId in the request matches the authenticated user's ID
    if (userId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You cannot impersonate another user.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Chat processed successfully',
      data: {
        echo: message,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('Chat API Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
