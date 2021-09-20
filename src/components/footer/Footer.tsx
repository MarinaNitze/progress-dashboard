import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';

import './Footer.scss';

const paths = [
  {
    path: 'images/footer/foster-america-logo.png',
    altText: 'Foster America logo',
  },
  {
    path: 'images/footer/new-america-logo.png',
    altText: 'New America logo',
  },
  {
    path: 'images/footer/thinkofus-logo.png',
    altText: 'Thinkofus logo',
  },
  {
    path: 'images/footer/bloom-works-logo.png',
    altText: 'Bloom Works logo',
  },
];

export default function Footer() {
  const imageMap = useGatsbyImages();

  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="cwp-footer">
      <div className="coop-container">
        <p className="coop-text">Made in cooperation with</p>
        <div className="logo-area">
          {paths.map(
            (logo, i) =>
              logo && (
                <GatsbyImage
                  key={`partner-logo-${i}`}
                  className="logo-img"
                  image={getImage(imageMap[logo.path])!}
                  alt={logo?.altText ?? `partner logo ${i}`}
                />
              ),
          )}
        </div>
      </div>
      <div className="cr-section">
        <p>© {getYear()} [WHO?]</p>
      </div>
    </footer>
  );
}
