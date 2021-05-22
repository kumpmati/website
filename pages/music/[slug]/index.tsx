import Page from "@components/Page/Page";
import Section from "@components/Section/Section";
import { getEntriesOfType, getSingleAlbum } from "@util/contentful";
import { CTAlbum, CTBlogPost } from "@type/content";
import { Entry } from "contentful";
import { FC } from "react";

const SingleAlbumPage: FC<PropsI> = ({ entry }) => {
  const { title } = entry.fields;

  return (
    <Page title={`MK | ${title}`}>
      <Section delay={0.5} style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h1>{title}</h1>
        </div>
      </Section>
    </Page>
  );
};

export default SingleAlbumPage;

interface PropsI {
  entry: Entry<CTAlbum>;
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const entry = await getSingleAlbum(slug);

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
