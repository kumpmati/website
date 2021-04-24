import { ThemeContext } from "@constants/colorSchemes";
import React, { FC, useContext } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

import css from "./MarkdownContent.module.css";

const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  const { dark } = useContext(ThemeContext);

  return (
    <ReactMarkdown
      components={{
        code: ({ children, node }) => {
          if (node.position.start.line === node.position.end.line)
            return <code className={css.snippet}>{children}</code>;

          const lang = node.properties?.className?.[0].replace("language-", "");
          return (
            <SyntaxHighlighter
              showLineNumbers
              style={dark ? atomOneDark : atomOneLight}
              language={lang}>
              {children}
            </SyntaxHighlighter>
          );
        },
      }}
      className={css.markdown}
      children={content}
    />
  );
};

export default MarkdownContent;
