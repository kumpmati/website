import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { getEntriesOfType, getSingleBlogPost } from "@services/contentful/util";
import { CTBlogPost } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";

const SingleBlogPostPage: FC<PropsI> = ({ entry }) => {
  const { title, content, summary } = entry.fields;
  const createdDate = new Date(entry.sys.createdAt).toLocaleDateString();

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={500} style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <p>{createdDate}</p>
        </div>
      </Section>

      <Section delay={750}>
        <MarkdownContent headingAnchors content={content} />
      </Section>
    </Page>
  );
};

export default SingleBlogPostPage;

interface PropsI {
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
    revalidate: 60 * 60, // 1 hour
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
