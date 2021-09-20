import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';

import './Footer.scss';

const paths = [
  {
    path: 'images/footer/foster-america-logo.svg',
    altText: 'Foster America logo',
  },
  {
    path: 'images/footer/new-america-logo.svg',
    altText: 'New America logo',
  },
  {
    path: 'images/footer/thinkofus-logo.svg',
    altText: 'Thinkofus logo',
  },
  {
    path: 'images/footer/bloom-works-logo.svg',
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
      <section className="coop-container">
        <p className="coop-text">Made in cooperation with</p>
        <section className="footer-content">
          <div className="logo-area">
            {paths.map(
              (logo, i) =>
                logo && (
                  <img
                    key={`partner-logo-${i}`}
                    className="logo-img"
                    src={imageMap[logo.path].publicURL}
                    alt={logo?.altText ?? `partner logo ${i}`}
                  />
                ),
            )}
          </div>
          <div className="cr-section">
            <p>© {getYear()} [WHO?]</p>
          </div>
        </section>
      </section>
    </footer>
  );
}
