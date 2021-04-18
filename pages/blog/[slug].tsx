import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { getEntriesOfType, getSingleBlogPost } from "@services/contentful/util";
import { CTBlogPost } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";

const SingleBlogPostPage: FC<SingleBlogPostPageProps> = ({ entry }) => {
  const { title, content, summary } = entry.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={500} isHeader>
        <h1>{title}</h1>
        <p>{summary}</p>
      </Section>

      <Section delay={750}>
        <MarkdownContent content={content} />
      </Section>
    </Page>
  );
};

export default SingleBlogPostPage;

interface SingleBlogPostPageProps {
  entry: Entry<CTBlogPost>;
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const entry = await getSingleBlogPost(slug);

  if (!entry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      entry,
    },
  };
}

export async function getStaticPaths() {
  const posts = (await getEntriesOfType<CTBlogPost>("blogPost")).items;
  const paths = posts.map((post) => ({ params: { slug: post.fields.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}
