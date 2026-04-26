import {blogs} from "@/.velite/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import { createClient } from '@supabase/supabase-js';

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let summaries = [];

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from('post_summaries').select('slug, summary');
    if (data) {
      summaries = data;
    }
  }

  // Attach summaries to blogs
  const blogsWithSummaries = blogs.map(blog => {
    const found = summaries.find(s => s.slug === blog.slug);
    return {
      ...blog,
      summary: found ? found.summary : blog.description // Fallback to description
    };
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogsWithSummaries} />
      <FeaturedPosts blogs={blogsWithSummaries} />
      <RecentPosts blogs={blogsWithSummaries} />
    </main>
  )
}
