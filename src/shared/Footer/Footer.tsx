'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { contentfulClient } from '@/lib/contentfulGraphQL'; // Your configured Contentful Apollo client
import { GET_FOOTER_DESCRIPTION, GET_FOOTER_LINKS } from '@/queries/contentfulQueries';
import Logo from '../Logo/Logo';
import FooterBanner from './FooterBanner';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [footerDescription, setFooterDescription] = useState<string>('Loading...');
  const [footerLinks, setFooterLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [descResponse, linksResponse] = await Promise.all([
          contentfulClient.query({
            query: GET_FOOTER_DESCRIPTION,
          }),
          contentfulClient.query({
            query: GET_FOOTER_LINKS,
          }),
        ]);

        const description = descResponse.data.footerDescriptionCollection.items[0]?.description;
        const links = linksResponse.data.footerLinksCollection.items;
        setFooterDescription(description);
        setFooterLinks(links);
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Social media links (static or add to your Contentful data if needed)
  const socialMediaLinks = [
    { platform: 'Facebook', url: 'https://facebook.com/HotKicks' },
    { platform: 'Twitter', url: 'https://twitter.com/HotKicks' },
    { platform: 'Instagram', url: 'https://instagram.com/HotKicks' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/HotKicks' },
  ];

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
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading footer...</div>;
  }

  if (error) {
    return <div>Error loading footer.</div>;
  }

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
            <p>{footerDescription}</p>
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
          <div className="grid grid-cols-2 gap-5">
            {footerLinks.map((linkItem) => (
              <div key={linkItem.url}>
                <Link href={linkItem.url}>{linkItem.link}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
  