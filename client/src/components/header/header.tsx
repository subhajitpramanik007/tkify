import { Link } from "react-router";
import { UserDropdown } from "./user-dropdown";

export const Header = () => {
  return (
    <header className="h-12 py-2 border-b-2 flex items-center justify-center border-gray-200 bg-white shadow-md">
      <div className="flex max-w-7xl w-full items-center justify-between">
        <Link to="/" className="relative">
          <h1 className="text-xl font-bold p-1 cursor-pointer tracking-tighter skew-x-3 skew-y-3 bg-orange-300 absolute top-0 blur-xl backdrop-blur-sm shadow-lg select-none">
            TKIFY
          </h1>
          <h1 className="text-xl font-bold p-1 cursor-pointer tracking-tighter skew-x-3 skew-y-3 bg-orange-300 z-10">
            TKIFY
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
