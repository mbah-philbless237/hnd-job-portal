import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-job", title: "My jobs" },
        { path: "/salary", title: "Salary Estimated" },
        { path: "/post-job", title: "Post A Job" },
    ];

    return (
        <header className="max-w-screen 2xl container mx-auto xl:px-24 px-4">
            <nav className="flex justify-between items-center py-6">
                <a href="/" className="flex items-center gap-2 text-2xl text-black">
                    {/* ADD LOGO */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="30"
                        viewBox="0 0 29 30"
                        fill="none"
                    >
                        <circle
                            cx={12.0143}
                            cy={12.5143}
                            r={12.0143}
                            fill="#3575E2"
                            fillOpacity="0.4"
                        />
                        <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
                    </svg>
                    <span>JobPortal</span>
                </a>
                {/* nav items for large devices */}
                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                                to={path}
                                className={({ isActive, isPending }) =>
                                    isActive ? "active" : isPending ? "pending" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {/* sign-up and login btn */}
                <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                    <Link to="/log-in" className="py-2 px-5 border rounded">Log in</Link>
                    <Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">Sign up</Link>
                </div>
                {/* mobile menu */}
                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary"/> : <FaBarsStaggered className="w-5 h-5 text-primary"/>}
                    </button>
                </div>
            </nav>
            {/* nav items for mobile */}
            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-white py-1">
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    <li className="text-white py-1"><Link to="/log-in">Log in</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
