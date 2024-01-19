const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center bg-primary-1 items-center text-sm py-2  md:hidden">
      &copy; {year} | Caio Martins
    </footer>
  );
};

export default Footer;
