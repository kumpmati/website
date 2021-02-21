import styles from "../../../styles/DefaultFooter.module.css";

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div id={styles.links}>
        <a href="https://github.com/kumpmati">Github</a>
        <a href="https://www.linkedin.com/in/matias-kumpulainen-27b4421b9/">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
