import MarkdownContent from "@components/MarkdownContent";
import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { getEntriesOfType, getSingleProject } from "@services/contentful/util";
import { CTProject } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";
import styles from "./[slug].module.css";

const SingleProjectPage: FC<PropsI> = ({ entry }) => {
  const { title, content, gitHub, url } = entry.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={250}>
        <div>
          <h1>{title}</h1>
        </div>

        <div className={styles.links}>
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

      <Section delay={500}>
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
  const { slug } = params;
  const entry = await getSingleProject(slug);

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
  const posts = (await getEntriesOfType<CTProject>("project")).items;
  const paths = posts.map((post) => ({ params: { slug: post.fields.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}
