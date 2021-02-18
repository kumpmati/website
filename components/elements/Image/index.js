const Image = ({ data, className, showCaption }) => {
  if (!data) return null;
  const { file, description } = data.fields;

  return (
    <figure className={className}>
      <img src={file.url} />
      {showCaption && <figcaption>{description}</figcaption>}
    </figure>
  );
};
export default Image;
