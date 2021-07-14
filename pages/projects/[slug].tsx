import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { getEntriesOfType, getSingleProject } from "@util/contentful";
import { CTProject } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";
import css from "./[slug].module.css";

const SingleProjectPage: FC<PropsI> = ({ entry }) => {
  const { title, content, gitHub, url } = entry.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={0.25}>
        <div>
          <h1>{title}</h1>
        </div>

        <div className={css.links}>
          {gitHub && (
            <a href={gitHub} target="_blank" referrerPolicy="no-referrer">
              GitHub
            </a>
          )}
          {url && (
            <a href={url} target="_blank" referrerPolicy="no-referrer">
              View
            </a>
          )}
        </div>
      </Section>

      <Section delay={0.5}>
        <MarkdownContent content={content?.fields?.markdownContent} />
      </Section>
    </Page>
  );
};

export default SingleProjectPage;

interface PropsI {
  entry: Entry<CTProject>;
}

export async function getStaticProps({ params }) {
  const entry = await getSingleProject(params.slug);

  if (!entry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      entry,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
}

export async function getStaticPaths() {
  const posts = (await getEntriesOfType<CTProject>("project")).items;
  const paths = posts.map(post => ({ params: { slug: post.fields.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}
