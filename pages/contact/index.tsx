import Header from "@components/Header/Header";
import Page from "@components/Page/Page";

const ContactPage = () => {
  return (
    <Page title="MK | Contact">
      <Header delay={500}>
        <h1>Contact me</h1>

        <ul>
          <li>
            <a href="mailto:hello@mvkump.dev">hello@mvkump.dev</a>
          </li>

          <br></br>

          <li>
            <a
              target="noreferrer"
              href="https://www.linkedin.com/in/matias-kumpulainen-27b4421b9/">
              LinkedIn
            </a>
          </li>
          <li>
            <a target="noreferrer" href="https://github.com/kumpmati">
              GitHub
            </a>
          </li>
        </ul>
      </Header>
    </Page>
  );
};

export default ContactPage;
