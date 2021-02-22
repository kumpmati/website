import ContactPageTemplate from "../../components/template/ContactPageTemplate";
import { transformContactPageProps } from "../../components/template/ContactPageTemplate/transform";

import DefaultHeader from "../../components/module/Header";
import DefaultLayout from "../../components/module/Body/Default";
import { getEntry } from "../../services/contentful/util";
import { ENTRIES } from "../../constants/entries";

export default ContactPageTemplate;
ContactPageTemplate.Header = DefaultHeader;
ContactPageTemplate.Layout = DefaultLayout;

export async function getStaticProps() {
  const content = await getEntry(ENTRIES.CONTACT_PAGE);
  return transformContactPageProps({ content });
}
