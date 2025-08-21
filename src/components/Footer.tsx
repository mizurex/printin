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
        { name: 'Delivery', href: '/delivery', tooltip: 'Fast delivery services' },
        { name: 'Click & Collect', href: '/click-collect', tooltip: 'Order online, collect in store' },
        { name: 'Sign In', href: '/signin', tooltip: 'Access your account' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Business', href: '/business', tooltip: 'Business solutions' },
        { name: 'Ryman', href: '/ryman', tooltip: 'Ryman products' },
        { name: 'Mail Boxes', href: '/mail-boxes', tooltip: 'Mail box services' },
        { name: 'Students', href: '/students', tooltip: 'Student discounts' },
      ]
    },
    {
      title: 'Printing Guides',
      links: [
        { name: 'Explore Collect Locations', href: '/collect-locations', tooltip: 'Find collection points' },
        { name: 'Printing Guides', href: '/printing-guides', tooltip: 'How-to guides' },
        { name: 'Blog', href: '/blog', tooltip: 'Latest articles and tips' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'Environment', href: '/environment', tooltip: 'Our sustainability efforts' },
        { name: 'Privacy Policy', href: '/privacy', tooltip: 'How we protect your data' },
        { name: 'Terms & conditions', href: '/terms', tooltip: 'Terms of service' },
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com', 
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com', 
      bgColor: 'bg-blue-700 hover:bg-blue-800',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com', 
      bgColor: 'bg-pink-500 hover:bg-pink-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297c-.875-.807-1.376-1.888-1.376-3.063c0-1.297.49-2.448 1.297-3.323c.807-.875 1.888-1.376 3.063-1.376c1.297 0 2.448.49 3.323 1.297c.875.807 1.376 1.888 1.376 3.063c0 1.297-.49 2.448-1.297 3.323c-.807.875-1.888 1.376-3.063 1.376z"/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com', 
      bgColor: 'bg-blue-400 hover:bg-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
  ];

  const LinkWithTooltip: React.FC<{ link: FooterLink }> = ({ link }) => (
    <div className="relative group mb-3">
      <Link 
        href={link.href}
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
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-4 gap-16 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-700 mb-6">
                {section.title}
              </h3>
              <div>
                {section.links.map((link) => (
                  <LinkWithTooltip key={link.name} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-5 mb-8">
          {socialLinks.map((social) => (
            <SocialIcon key={social.name} social={social} />
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center text-gray-600 text-sm leading-relaxed max-w-4xl mx-auto mb-8">
          <strong className="text-gray-800">*100% money back guarantee</strong> only covers instances where the printing quality has visible imperfections or is
          incorrectly printed. A photo of the imperfection has to be provided and evaluated by our team. Delivery delays
          specifically do not fall under this guarantee and a refund will not be issued for late orders.
        </div>

        {/* App Store Buttons */}
        <div className="flex justify-center gap-5">
          <a
            href="#"
            className="bg-black rounded-xl px-6 py-3 flex items-center gap-3 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div>
              <div className="text-xs">Download on the</div>
              <div className="text-lg font-semibold -mt-1">App Store</div>
            </div>
          </a>
          
          <a
            href="#"
            className="bg-black rounded-xl px-6 py-3 flex items-center gap-3 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <div>
              <div className="text-xs">GET IT ON</div>
              <div className="text-lg font-semibold -mt-1">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;