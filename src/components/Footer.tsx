import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  name: string;
  href: string;
  tooltip: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Services',
      links: [
        { name: 'Printing', href: '/order', tooltip: 'Start printing' },
        { name: 'Delivery', href: '/order', tooltip: 'Fast delivery services' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/order', tooltip: 'Get help' },
        { name: 'Contact Us', href: '/order', tooltip: 'Reach out to us' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/order', tooltip: 'How we protect your data' },
        { name: 'Terms of Service', href: '/order', tooltip: 'Terms of service' },
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com', 
      bgColor: 'bg-gray-800 hover:bg-[#026766]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com', 
      bgColor: 'bg-blue-700 hover:bg-[#026766]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  const LinkWithTooltip: React.FC<{ link: FooterLink }> = ({ link }) => (
    <div className="relative group mb-3">      
      <Link 
       href={"/order"} 
        className="text-gray-500 hover:text-blue-600 transition-all duration-300 text-base hover:-translate-y-0.5 inline-block underline decoration-gray-300 hover:decoration-blue-600"
      >
        {link.name}
      </Link>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 group-hover:-translate-y-1">
        {link.tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
      </div>
    </div>
  );

  const SocialIcon: React.FC<{ social: typeof socialLinks[0] }> = ({ social }) => (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg ${social.bgColor}`}
      aria-label={social.name}
    >
      {social.icon}
    </a>
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 hover:text-[#026766] mb-4 sm:mb-6">
                {section.title}
              </h3>
              <div className='hover:text-[#026766]'>
                {section.links.map((link) => (
                  <LinkWithTooltip key={link.name} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>



  

        <div className="text-center border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm mb-2">
            © PrintIn.Copy of printt.
          </p>
          <p className="text-gray-500 text-xs">
            made by Turf
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;