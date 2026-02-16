import "./components.css";
export default function Header({ setProfile }) {
  function handleSignOut() {
    setProfile(null);
  }

  return (
    <div className="flex items-center justify-center w-full h-12.5 shadow-sm green">
      <div className="w-45 flex-1 pl-5 customFont">
        <p>The Social</p>
      </div>
      <nav className="flex-1 flex justify-center w-50 h-full customFont">
        <button className="bt">Profile</button>
        <button className="bt">Create</button>
        <button className="bt">Follow</button>
        <button className="bt" onClick={handleSignOut}>
          Signout
        </button>
      </nav>
      <div className="w-45 text-right flex-1 pr-5 customFont">
        <input
          className="w-37.5 text-center bg-white hover:bg-gray-100 active:bg-gray-200 rounded-sm "
          type="text"
          id="search"
          name="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
