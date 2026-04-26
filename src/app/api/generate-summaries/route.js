import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { blogs } from '@/.velite/generated';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase credentials missing' }, { status: 500 });
    }

    if (!geminiApiKey) {
      return NextResponse.json({ error: 'Gemini API key missing (GEMINI_API_KEY)' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using flash for speed

    const results = [];

    for (const blog of blogs) {
      // 1. Check if summary already exists in Supabase
      const { data, error: fetchError } = await supabase
        .from('post_summaries')
        .select('summary')
        .eq('slug', blog.slug)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 is the "no rows returned" error, which is expected if it doesn't exist.
        console.error("Error fetching summary for", blog.slug, fetchError);
        continue;
      }

      if (data && data.summary) {
        // Summary already exists
        results.push({ slug: blog.slug, status: 'exists', summary: data.summary });
        continue;
      }

      // 2. Generate summary using Gemini
      console.log(`Generating summary for ${blog.slug}...`);
      
      const prompt = `Please read the following blog post content and provide a short, engaging summary of about 20-30 words. The summary should entice the reader to click and read the full post. Do not include introductory phrases like "Here is a summary". Just return the summary text itself.\n\nBlog Title: ${blog.title}\n\nContent:\n${blog.body}`;
      
      const result = await model.generateContent(prompt);
      const generatedSummary = result.response.text().trim();

      // 3. Save to Supabase
      const { error: insertError } = await supabase
        .from('post_summaries')
        .insert({ slug: blog.slug, summary: generatedSummary });

      if (insertError) {
        console.error("Error saving summary to Supabase for", blog.slug, insertError);
        results.push({ slug: blog.slug, status: 'error', error: insertError.message });
      } else {
        results.push({ slug: blog.slug, status: 'generated', summary: generatedSummary });
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error("Generate summaries error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
