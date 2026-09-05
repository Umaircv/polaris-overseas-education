import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta, InnerPage } from "../../page-chrome";
import { blogPosts } from "../blog-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <InnerPage>
      <article className="blog-article">
        <header>
          <a href="/blogs">← All blogs</a>
          <p>{post.category} · {post.date} · {post.readTime}</p>
          <h1>{post.title}</h1>
          <strong>{post.excerpt}</strong>
        </header>
        <div className="blog-article-body">
          <aside><span>IN THIS GUIDE</span>{post.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>{String(index + 1).padStart(2, "0")} · {section.heading}</a>)}</aside>
          <div>
            <p className="article-intro">{post.intro}</p>
            {post.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
              </section>
            ))}
            <div className="article-note"><strong>Important</strong><p>Always confirm current requirements, dates and decisions through the relevant university, scholarship provider, embassy or authorised authority.</p></div>
          </div>
        </div>
      </article>
      <section className="related-posts">
        <h2>Continue reading</h2>
        <div>{related.map((item) => <a key={item.slug} href={`/blogs/${item.slug}`}><span>{item.category}</span><strong>{item.title}</strong><small>{item.readTime} ↗</small></a>)}</div>
      </section>
      <ContactCta />
    </InnerPage>
  );
}

