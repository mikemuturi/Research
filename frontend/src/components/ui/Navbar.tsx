// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Globe, Menu, X } from 'lucide-react';

// const Navbar: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4 md:py-6">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Globe className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-2 md:mr-3" />
//             <h1 className="text-lg md:text-2xl font-bold text-gray-900">
//               <span className="hidden sm:inline">RAFSIA Assessment</span>
//               <span className="sm:hidden">RAFSIA</span>
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
//             <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Home
//             </Link>
//             <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               About
//             </Link>
//             <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Contact Us
//             </Link>
//             <Link href="/admin/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Login
//             </Link>
//             <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
//               Privacy
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             <nav className="flex flex-col space-y-4">
//               <Link 
//                 href="/" 
//                 className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-md"
//                 onClick={closeMenu}
//               >
//                 Home
//               </Link>
//               <Link 
//                 href="/about" 
//                 className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-md"
//                 onClick={closeMenu}
//               >
//                 About
//               </Link>
//               <Link 
//                 href="/contact" 
//                 className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-md"
//                 onClick={closeMenu}
//               >
//                 Contact Us
//               </Link>
//               <Link 
//                 href="/admin/login" 
//                 className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-md"
//                 onClick={closeMenu}
//               >
//                 Login
//               </Link>
//               <Link 
//                 href="/privacy" 
//                 className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-md"
//                 onClick={closeMenu}
//               >
//                 Privacy
//               </Link>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { Globe, Menu, X, UserCircle, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const Navbar: React.FC = () => {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isAuthed, setIsAuthed] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
//     setIsAuthed(Boolean(token));
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(v => !v);
//   const closeMenu = () => setIsMenuOpen(false);

//   const handleLogout = () => {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//     }
//     setIsAuthed(false);
//     setIsProfileOpen(false);
//     router.push('/'); // go home
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Top row */}
//         <div className="flex items-center justify-between py-4 md:py-5">
//           {/* Brand */}
//           <Link href="/" className="flex items-center space-x-2">
//             <Globe className="h-7 w-7 md:h-8 md:w-8 text-blue-600" />
//             <div className="leading-none">
//               <div className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
//                 RAFSIA
//               </div>
//               <div className="text-[11px] md:text-xs text-gray-500 -mt-0.5">
//                 Assessment Tool
//               </div>
//             </div>
//           </Link>

//           {/* Desktop nav */}
//           <div className="hidden md:flex items-center gap-8">
//             <nav className="flex items-center gap-6">
//               <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
//               <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
//               <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
//               <Link href="/privacy" className="text-gray-600 hover:text-gray-900 font-medium">Privacy</Link>
//             </nav>

//             {/* Profile dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsProfileOpen(v => !v)}
//                 className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 aria-label="Open profile menu"
//               >
//                 <UserCircle className="h-7 w-7 text-gray-700" />
//               </button>

//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
//                   {!isAuthed && (
//                     <>
//                       <Link
//                         href="/admin/login"
//                         onClick={() => setIsProfileOpen(false)}
//                         className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
//                       >
//                         <LogIn className="h-4 w-4" /> Login
//                       </Link>
//                       <Link
//                         href="/register"
//                         onClick={() => setIsProfileOpen(false)}
//                         className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
//                       >
//                         <UserPlus className="h-4 w-4" /> Register
//                       </Link>
//                       <Link
//                         href="/settings"
//                         onClick={() => setIsProfileOpen(false)}
//                         className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
//                       >
//                         <Settings className="h-4 w-4" /> Settings
//                       </Link>
//                     </>
//                   )}

//                   {isAuthed && (
//                     <>
//                       <Link
//                         href="/settings"
//                         onClick={() => setIsProfileOpen(false)}
//                         className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
//                       >
//                         <Settings className="h-4 w-4" /> Settings
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-red-600"
//                       >
//                         <LogOut className="h-4 w-4" /> Logout
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={toggleMenu}
//             className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile sheet */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             <nav className="flex flex-col space-y-2">
//               <Link href="/" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Home</Link>
//               <Link href="/about" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>About</Link>
//               <Link href="/contact" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Contact</Link>
//               <Link href="/privacy" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Privacy</Link>

//               <div className="mt-2 border-t border-gray-100 pt-2">
//                 <Link href="/admin/login" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Login</Link>
//                 <Link href="/register" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Register</Link>
//                 <Link href="/settings" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Settings</Link>
//                 <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-gray-50">Logout</button>
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Globe, Menu, X, UserCircle, LogOut, Settings, LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/hooks/useAuth';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const ProfileAvatar = () => {
    if (loading) {
      return (
        <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse" />
      );
    }

    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt={user.displayName || 'Profile'}
          className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 hover:border-gray-300 transition-colors"
        />
      );
    }

    return <UserCircle className="h-7 w-7 text-gray-700" />;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between py-4 md:py-5">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-7 w-7 md:h-8 md:w-8 text-blue-600" />
            <div className="leading-none">
              <div className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                RAFSIA
              </div>
              <div className="text-[11px] md:text-xs text-gray-500 -mt-0.5">
                Assessment Tool
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 font-medium">Privacy</Link>
            </nav>

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(v => !v)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center"
                aria-label="Open profile menu"
              >
                <ProfileAvatar />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                  {/* User Info Section */}
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || 'Profile'}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Menu Items */}
                  {!user && (
                    <>
                      <Link
                        href="/admin/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                      >
                        <LogIn className="h-4 w-4" /> Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                      >
                        <UserPlus className="h-4 w-4" /> Register
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                    </>
                  )}

                  {user && (
                    <>
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                      >
                        <Settings className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-700"
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-red-600"
                        >
                          <LogOut className="h-4 w-4" /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile sheet */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Home</Link>
              <Link href="/about" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>About</Link>
              <Link href="/contact" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Contact</Link>
              <Link href="/privacy" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Privacy</Link>

              <div className="mt-2 border-t border-gray-100 pt-2">
                {/* User info for mobile */}
                {user && (
                  <div className="px-4 py-3 bg-gray-50 rounded-md mb-2">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'Profile'}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!user && (
                  <>
                    <Link href="/admin/login" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Login</Link>
                    <Link href="/register" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Register</Link>
                  </>
                )}
                
                <Link href="/settings" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={closeMenu}>Settings</Link>
                
                {user && (
                  <button onClick={() => { handleLogout(); closeMenu(); }} className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-gray-50">Logout</button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;