const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center items-center text-sm py-2 bg-primary-2">
      &copy; {year} | Caio Martins
    </footer>
  );
};

export default Footer;
