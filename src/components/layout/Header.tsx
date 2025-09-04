export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-semibold text-xl">React App</div>
        <nav className="flex items-center space-x-4">
          <a href="/" className="hover:text-gray-600">
            Home
          </a>
          <a href="/about" className="hover:text-gray-600">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};
