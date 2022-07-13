import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';

import './Footer.scss';

const paths = [
  {
    path: 'images/footer/foster-america-logo.svg',
    altText: 'Foster America logo',
    partnerURL: 'https://www.foster-america.org',
  },
  {
    path: 'images/footer/new-america-logo.svg',
    altText: 'New America logo',
    partnerURL: 'https://www.newamerica.org/new-practice-lab',
  },
  {
    path: 'images/footer/thinkofus-logo.svg',
    altText: 'Thinkofus logo',
    partnerURL: 'https://www.thinkof-us.org',
  },
  {
    path: 'images/footer/bloom-works-logo.svg',
    altText: 'Bloom Works logo',
    partnerURL: 'https://bloomworks.digital',
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
            {paths.map(({ path, altText, partnerURL }, i) => (
              <a href={partnerURL}>
                <img
                  key={`${path}-${altText}`}
                  className="logo-img"
                  src={imageMap[path].publicURL}
                  alt={altText ?? `partner logo ${i}`}
                />
              </a>
            ))}
          </div>
          <div className="cr-section">
            <p>© {getYear()}</p>
          </div>
        </section>
      </section>
    </footer>
  );
}
