import Logo from "../assets/Diamond+.png";

function Header({ onTextChange, searchText }) {
  return (
    <header>
      <img src={Logo} alt="movie__image" className="movie__img" />
      <h2 className="header__title">Diamond+ Media</h2>
      <div className="search__bar">
        <input
          type="text"
          className="search"
          value={searchText}
          placeholder="Search for media..."
          onChange={onTextChange}
        />
      </div>
    </header>
  );
}

export default Header;
