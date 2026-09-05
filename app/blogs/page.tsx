import type { Metadata } from "next";
import { ContactCta, InnerPage, PageHero, SectionIntro } from "../page-chrome";
import { blogPosts } from "./blog-data";

export const metadata: Metadata = {
  title: "Study Abroad Blogs",
  description: "Practical study abroad guidance on course selection, admissions, scholarships, IELTS and student visas.",
};

export default function BlogsPage() {
  const [featured, ...posts] = blogPosts;
  return (
    <InnerPage>
      <PageHero
        eyebrow="Polaris insights"
        title="Clear answers for"
        accent="important decisions."
        description="Practical guidance for students and families planning admissions, scholarships, language preparation and the journey abroad."
        aside={<div className="blog-hero-aside"><span>NEW</span><strong>{featured.title}</strong><a href={`/blogs/${featured.slug}`}>Read featured guide ↗</a></div>}
      />
      <section className="inner-content-section blog-index-section">
        <SectionIntro eyebrow="Latest guidance" title="Learn before you apply." text="Use these guides as a starting point, then verify current requirements with the relevant official institution or authority." />
        <a className="featured-blog-card" href={`/blogs/${featured.slug}`}>
          <div><span>{featured.category}</span><small>{featured.date} · {featured.readTime}</small></div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <strong>Read the guide <i aria-hidden="true">↗</i></strong>
        </a>
        <div className="blog-card-grid">
          {posts.map((post, index) => (
            <a href={`/blogs/${post.slug}`} key={post.slug}>
              <div><span>{post.category}</span><small>0{index + 2}</small></div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <footer><small>{post.date} · {post.readTime}</small><i aria-hidden="true">↗</i></footer>
            </a>
          ))}
        </div>
      </section>
      <ContactCta title="Need advice for your own profile?" text="A general guide can help you prepare. A counselling session can help you choose the right next step for your situation." />
    </InnerPage>
  );
}

