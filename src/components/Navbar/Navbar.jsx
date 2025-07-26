import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/rLogoo.png";
import { authContext } from "../../Contexts/AuthContext";
import axios from "axios";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const [enabled, setEnabled] = useState(false);
  const { IsLoggedIn, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setEnabled(initialDark);
  }, []);

  useEffect(() => {
    if (enabled) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [enabled]);
  async function Logout() {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://hotel.rasool.click/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      setIsLoggedIn(false);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    }
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/" className="flex items-center w-32 gap-0">
          <img className="h-16" src={logo} alt="Logo" />
          <h1 className="font-bold text-inherit ml-0 font-mono">Hope Hotel</h1>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {!IsLoggedIn && (
          <>
            <NavbarItem className="lg:flex">
              <NavLink to={"/login"}>Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={() => navigate("/register")}
                color="warning"
                variant="bordered"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        {IsLoggedIn && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform border border-mainColor"
                color="transparent"
                name="User Menu"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="My_Protofolio" as={Link} to="/my-profile">
                My Portfolio
              </DropdownItem>
              <DropdownItem key="Booking_Now" as={Link} to="/Rooms-available">
                Booking Now
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={Logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <div className="w-20 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"></div>
        </label>
      </NavbarContent>
    </Navbar>
  );
}
