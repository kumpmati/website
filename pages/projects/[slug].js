import {
  getEntriesOfType,
  getProjectBySlug,
} from "../../services/contentful/util";
import {
  transformProjectStaticPaths,
  transformProjectStaticProps,
} from "../../components/template/SingleProjectTemplate/transform";

import SingleProjectTemplate from "../../components/template/SingleProjectTemplate";

import DefaultHeader from "../../components/module/Header";
import DefaultLayout from "../../components/module/Body/Default";

export default SingleProjectTemplate;
SingleProjectTemplate.Header = DefaultHeader;
SingleProjectTemplate.Layout = DefaultLayout;

export async function getStaticPaths() {
  const projects = await getEntriesOfType("project");
  return transformProjectStaticPaths({ projects });
}

export async function getStaticProps({ params }) {
  const project = await getProjectBySlug(params.slug);
  return transformProjectStaticProps({ project });
}
