import { useState } from 'react';

import { TbHelmet, TbHome, TbIcons, TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled, TbUser } from 'react-icons/tb';
import { Link } from 'react-router';

export const AdminList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adminLinks = [
    { name: 'Dashboard', icon: TbHome, href: '/admin' },
    { name: 'Drivers', icon: TbHelmet, href: '/admin/drivers' },
    { name: 'Users', icon: TbUser, href: '/admin/users' },
  ];

  return (
    <div className="flex">
      <div className={`${isSidebarOpen ? '' : ''} bg-gray-800 text-white transition-all duration-300`}>
        <ul>
          {adminLinks.map((link) => (
            <li key={link.name} className="p-2 hover:bg-gray-700 h-auto flex flex-row align-middle text-center text-xl">
              <Link to={link.href} className={'flex flex-row gap-2' + (isSidebarOpen ? ' pr-4' : '')}>
                {link.icon && <link.icon className={"text-2xl mb-auto mt-auto" + (isSidebarOpen ? '' : ' text-4xl')} />}
                {isSidebarOpen && <p className="text-center mb-auto mt-auto">{link.name}</p>}
              </Link>
            </li>
          ))}
        </ul>
        <button className="p-2 focus:outline-none bottom-0 absolute text-3xl" onClick={toggleSidebar}>
          {isSidebarOpen ? <TbLayoutSidebarRightExpandFilled /> : <TbLayoutSidebarLeftExpandFilled />}
        </button>
      </div>
    </div>
  );
};
