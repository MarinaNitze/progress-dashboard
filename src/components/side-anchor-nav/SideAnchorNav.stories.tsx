import React, { createContext, useEffect, useCallback } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import { useState, useRef } from '@storybook/addons';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import SideAnchorNav from './SideAnchorNav';
import content from './content.yml';

type ContextState = {
  [key: string]: React.MutableRefObject<null> | null;
};

const defaultContextState: ContextState = {
  mainRef: null,
  secondRef: null,
  thirdRef: null,
};

const bootstrapStoryContext = {
  state: defaultContextState,
  setState: (_state: ContextState) => {},
};

/* Put references in the context */
const RefContext = createContext(bootstrapStoryContext);

const { text } = content.example;

const testItems: AnchorLinkProps[] = [
  {
    to: '/#main',
    title: 'Go to Main',
  },
  {
    to: '/#second',
    title: 'Go to Second',
  },
  {
    to: '/#third',
    title: 'What we can do',
  },
];

export default {
  title: 'Example/SideAnchorNav',
  component: SideAnchorNav,
} as ComponentMeta<typeof SideAnchorNav>;

const Template: ComponentStory<typeof SideAnchorNav> = () => {
  const [state, setState] = useState(bootstrapStoryContext.state);
  const mainRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const [anchorLinks, setAnchorLinks] = useState(testItems);

  const go = useCallback((toRef: React.RefObject<HTMLElement> | null) => {
    if (toRef?.current) {
      window.scrollTo(0, toRef.current.offsetTop);
      toRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const refs = [mainRef, secondRef, thirdRef];
    setAnchorLinks(prev =>
      prev.map((link, i) => ({
        ...link,
        onAnchorLinkClick: () => {
          go(refs[i]);
        },
      })),
    );
  }, [mainRef, secondRef, thirdRef]);

  return (
    <RefContext.Provider value={{ state, setState }}>
      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
              <nav aria-label="Secondary navigation">
                <SideAnchorNav items={anchorLinks} />
              </nav>
            </Grid>
            <main
              className="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs"
              id="main-content"
            >
              <h3 ref={mainRef}>Main</h3>

              <p className="usa-intro">{text}</p>
              <h3 ref={secondRef}>Secondary</h3>

              <p>{text}</p>

              <h3 ref={thirdRef}>Third</h3>

              <p>{text}</p>
            </main>
          </Grid>
        </GridContainer>
      </section>
    </RefContext.Provider>
  );
};

export const Default = Template.bind({});
Default.args = {};
