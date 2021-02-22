import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Head from "next/head";
import { PAGE_TITLE } from "../../../constants";

const ContactPageTemplate = ({ content }) => {
  const { title } = content;

  return (
    <>
      <Head>
        <title>
          {PAGE_TITLE} | {title}
        </title>
      </Head>
      <h1 className="page-title">{title}</h1>
      <div className="subtle-text">
        {documentToReactComponents(content.content)}
      </div>
    </>
  );
};

export default ContactPageTemplate;
