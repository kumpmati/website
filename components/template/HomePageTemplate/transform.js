export const transformHomePageData = ({ content }) => {
  return {
    props: {
      content: content && content.fields,
    },
    revalidate: 60,
  };
};
