import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';

import './Footer.scss';

export default function Footer() {
  const imageMap = useGatsbyImages();

  const fosterAmericaImg = imageMap['images/footer/foster-america-logo.png'];
  const newAmericaImg = imageMap['images/footer/new-america-logo.png'];
  const thinkofusImg = imageMap['images/footer/thinkofus-logo.png'];
  const bloomWorksImg = imageMap['images/footer/bloom-works-logo.png'];

  const faLogo = fosterAmericaImg && {
    ...getImage(fosterAmericaImg),
    altText: 'Foster America logo',
  };
  const naLogo = newAmericaImg && {
    ...getImage(newAmericaImg),
    altText: 'New America logo',
  };
  const touLogo = thinkofusImg && {
    ...getImage(thinkofusImg),
    altText: 'Thinkofus logo',
  };
  const bwLogo = bloomWorksImg && {
    ...getImage(bloomWorksImg),
    altText: 'Bloom Works logo',
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="cwp-footer">
      <div className="coop-container">
        <p className="coop-text">Made in cooperation with</p>
        <div className="logo-area">
          {[faLogo, naLogo, touLogo, bwLogo].map(
            (logo, i) =>
              logo && (
                <GatsbyImage
                  key={`partner-logo-${i}`}
                  className="logo-img"
                  image={logo}
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
