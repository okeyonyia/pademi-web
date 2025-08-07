'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig/firebaseConfig';
import { BiParty } from 'react-icons/bi';
import { Store } from 'lucide-react';
import SafeImage from '../../SafeImage';

// import SafeImage from '@/components/common/safeimage/SafeImage';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    {
      href: '/dashboard/users',
      label: 'Users',
      icon: <User size={20} />,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      href: '/dashboard/events',
      label: 'Events',
      icon: <BiParty size={20} />,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      href: '/dashboard/restaurants',
      label: 'Restaurants',
      icon: <Store size={20} />,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  if (!isMounted) {
    return (
      <div className='w-72 h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-white/10 animate-pulse'>
        <div className='p-6'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='w-12 h-12 bg-white/10 rounded-2xl p-2'>
                <div className='w-full h-full bg-white/5 rounded-lg'></div>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='h-4 bg-white/10 rounded w-20'></div>
              <div className='h-3 bg-white/5 rounded w-24'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen overflow-y-auto bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white w-72 z-50 backdrop-blur-xl border-r border-white/10 transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen`}
      >
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-pink-900/50 backdrop-blur-sm'></div>

        {/* Content */}
        <div className='relative z-10 flex flex-col h-full'>
          {/* Sidebar Header */}
          <div className='flex-shrink-0 p-6 border-b border-white/10'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-md opacity-75'></div>
                <div className='relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2'>
                  <div className='w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center'>
                    <SafeImage
                      src='/LOGO.webp'
                      alt='Pademi Logo'
                      width={36}
                      height={36}
                      className='rounded-lg'
                      fallbackInitial='P'
                      gradientClasses='from-blue-400 to-purple-500'
                    />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent'>
                  Pademi
                </h1>
                <p className='text-xs text-white/60 font-medium'>
                  Admin Dashboard
                </p>
              </div>
              <button
                className='lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors'
                onClick={toggleSidebar}
              >
                <X size={20} className='text-white/80' />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className='flex-1 overflow-y-auto p-6'>
            <nav className='space-y-2'>
              <div className='text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-3'>
                Navigation
              </div>

              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-white/20 to-white/5 shadow-lg border border-white/20'
                        : 'hover:bg-white/10 hover:translate-x-1'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Background gradient for active item */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-xl`}
                      ></div>
                    )}

                    {/* Icon container */}
                    <div
                      className={`relative z-10 p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} shadow-lg`
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`}
                    >
                      <div
                        className={
                          isActive
                            ? 'text-white'
                            : 'text-white/70 group-hover:text-white'
                        }
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Label */}
                    <span
                      className={`relative z-10 font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className='absolute right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0'></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className='flex-shrink-0 p-6 border-t border-white/10'>
            <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-4'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0'>
                  <User size={16} className='text-white' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-white truncate'>
                    Admin
                  </p>
                  <p className='text-xs text-white/50 truncate'>
                    Administrator
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className='group flex items-center gap-3 w-full p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 hover:from-red-500/30 hover:to-red-600/30 transition-all duration-300 hover:scale-105'
            >
              <LogOut
                size={18}
                className='text-red-400 group-hover:text-red-300 flex-shrink-0'
              />
              <span className='text-red-400 group-hover:text-red-300 font-medium'>
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-32 right-4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none'></div>
        <div className='absolute bottom-32 left-4 w-24 h-24 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-xl pointer-events-none'></div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          className='fixed top-6 left-6 z-50 lg:hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300'
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
