import React from 'react';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import FooterBanner from './FooterBanner';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { footerData } from '@/data/content';
import globalConfig from '@/core/config/global.json';

const Footer: React.FC = () => {
  const { description, footerLinks } = footerData;

  // Social media links from global config
  const socialMediaLinks = [
    { platform: 'Facebook', url: globalConfig.socialLinks.facebook },
    { platform: 'Twitter', url: globalConfig.socialLinks.twitter },
    { platform: 'Instagram', url: globalConfig.socialLinks.instagram },
    ...(globalConfig.socialLinks.tiktok ? [{ platform: 'TikTok', url: globalConfig.socialLinks.tiktok }] : []),
  ].filter(link => link.url !== "");

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <FaFacebookF />;
      case 'twitter':
        return <FaTwitter />;
      case 'instagram':
        return <FaInstagram />;
      case 'linkedin':
        return <FaLinkedinIn />;
      case 'tiktok':
        return <FaTiktok />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="container mb-10">
        <FooterBanner />
      </div>

      <div className="bg-black text-white">
        <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:gap-0">
          {/* Left Column: Logo, Description, and Social Media Icons */}
          <div className="space-y-10 md:pr-20">
            <Logo className="block" />
            <p>{description}</p>
            <div className="flex space-x-4">
              {socialMediaLinks.map((social) => (
                <Link key={social.platform} href={social.url}>
                  <div className="text-xl hover:text-gray-400">
                    {getSocialIcon(social.platform)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Footer Links */}
          <div className="flex flex-row justify-between w-full">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold text-lg mb-4">{column.title}</h4>
                <div className="flex flex-col space-y-2">
                  {column.links.map((link) => (
                    <Link key={link.name} href={link.href} className="text-gray-400 hover:text-white">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;