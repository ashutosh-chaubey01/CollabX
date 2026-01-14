/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiUser, FiCheckSquare } from "react-icons/fi";

function Navbar({
  isTemplate,
  toEditing,
}: {
  isTemplate: boolean;
  toEditing: () => void;
}) {
  const design = {
    logoBox:
      "grid size-10 place-content-center rounded-md bg-white cursor-pointer hover:scale-105 hover:bg-white/80 transition-transform duration-300 ease-in-out active:scale-95",
  };

  function handleClick() {
    toEditing();
  }

  return (
    <main className="w-10 h-full flex flex-col justify-between items-center mx-auto py-5">
      <div className="flex flex-col justify-center items-center gap-4">
        <a href="/profile">
          <div className={design.logoBox}>
            <FiUser />
          </div>
        </a>
      </div>
      <div
        onClick={handleClick}
        className={`${
          design.logoBox
        } hover:bg-emerald-600/50 transition-colors ${
          isTemplate ? `block` : `hidden`
        }`}>
        <FiCheckSquare />
      </div>
    </main>
  );
}

export default Navbar;
