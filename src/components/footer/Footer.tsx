import "./footer.css"

interface FooterProps {
  darkMode: boolean;
}
const Footer = ({darkMode}: FooterProps) => {
  return (
    <footer className={`${darkMode ? "footerDark" : "footerLight"} footer`}>
      <p>© 2025 Job Board</p>
    </footer>
  );
};

export default Footer;
