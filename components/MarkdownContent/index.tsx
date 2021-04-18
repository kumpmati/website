import { FC } from "react";
import ReactMarkdown from "react-markdown";

import css from "./MarkdownContent.module.css";

const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  return <ReactMarkdown className={css.markdown} children={content} />;
};

export default MarkdownContent;
