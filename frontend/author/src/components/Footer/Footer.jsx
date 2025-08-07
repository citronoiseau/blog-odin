import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>Made with love by</div>
      <a href="https://github.com/citronoiseau" target="_blank">
        citronoiseau
      </a>
    </footer>
  );
};

export default Footer;
