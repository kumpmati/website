import Section from "@components/Section/Section"
import Page from "@components/Page/Page"

const ContactPage = () => {
  return (
    <Page title="MK | Contact">
      <Section delay={0.5}>
        <h1>Contact me</h1>

        <ul>
          <li>
            <a href="mailto:matias.kumpulainen@kvanttori.fi">matias.kumpulainen@kvanttori.fi</a>
          </li>

          <li>
            <a target="noreferrer" href="https://www.linkedin.com/in/matias-kumpulainen-27b4421b9/">
              LinkedIn
            </a>
          </li>
          <li>
            <a target="noreferrer" href="https://github.com/kumpmati">
              GitHub
            </a>
          </li>
        </ul>
      </Section>
    </Page>
  )
}

export default ContactPage
