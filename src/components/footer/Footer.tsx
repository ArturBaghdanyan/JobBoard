import "./footer.css";

interface FooterProps {
  darkMode: boolean;
}
const Footer = ({ darkMode }: FooterProps) => {
  const date = new Date();

  return (
    <footer className={`${darkMode ? "footerDark" : "footerLight"} footer`}>
      <p>© {date.getFullYear()} Job Board</p>
    </footer>
  );
};

export default Footer;
