import Link from "next/link";

const NavigationLink = ({ data }) => {
  const { text, url } = data.fields;

  return (
    <li className="nav-link">
      <Link href={url}>{text}</Link>
    </li>
  );
};

export default NavigationLink;
