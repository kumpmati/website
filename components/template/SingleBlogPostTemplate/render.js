import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export const renderImageAsset = node => {
  const url = node.data.target.fields.file.url;
  return <img src={url} />;
};

export const richTextRenderOpts = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: renderImageAsset,
  },
};

export const renderRichText = body => {
  return documentToReactComponents(body, richTextRenderOpts);
};
