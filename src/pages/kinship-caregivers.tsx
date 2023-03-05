import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SideAnchorNav from '../components/side-anchor-nav/SideAnchorNav';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import './home.scss';

const ABOUT = `
A new [draft rule](https://www.federalregister.gov/documents/2023/02/14/2023-03005/separate-licensing-standards-for-relative-or-kinship-foster-family-homes) proposes allowing child welfare systems to have a kin-specific process for approving kin. If it’s finalized, systems will be able to create new, streamlined processes for providing kin with Foster Care Maintenance Payments that are eligible for Title IV-E reimbursement. 

A state’s new process needs to be “reasonably in accord with recommended standards of national organizations concerned with standards for [foster family] homes, including standards related to admission policies, safety, sanitation, and protection of civil rights.”

We are proposing Standards for Kinship Caregivers that can serve as these “recommended standards of national organizations,” similar to how the [Model Foster Home Licensing Standards](https://nara.memberclicks.net/nara-model-foster-care-standards) served as the recommended standards for the previous combined (kin and non-kin) process. 

The goal of these Standards for Kinship Caregivers is for every kinship caregiver to be qualified for Foster Care Maintenance Payments from the date the kinship child is placed. 

We are co-designing these standards with a diverse array of kinship caregivers from around the country, and are seeking as much input from states and child welfare workers as possible, too. This can ultimately enable greater permanency and well-being for many children and families.

`;

const GET_INVOLVED = `
- [Sign up for email updates](https://mailchi.mp/childwelfareplaybook/standards-for-kinship-caregivers)
- Sign up for the next webinar (Coming Soon!)
- Read the current draft kinship standards (Coming Soon!)
`;

const MORE_WAYS = `
Join a learning sprint: A learning sprint is a process where trained researchers talk to a
 diverse range of people impacted by the process (including kinship caregivers, parents of 
 children involved in care, and workers processing background checks) to uncover pain points,
 creative solutions, and opportunities for improvement to the process.



### Join the learning sprint to improve the background check process for kinship caregivers
- We want to design and recommend a background check process that is both a good experience
  for kinship caregivers and fast, while continuing to meet federal requirements.
- [Sign up here](https://airtable.com/shrQkKvpnAnLjhUuj)
    - We are especially looking for: current or former kinship caregivers; tribal partners;
      current child welfare workers who request or process background checks; 
      parents of children currently or formerly in foster care (especially fathers);
      and people who process background checks in areas outside of foster care (childcare; guns; employee screening; etc.).
- Participants selected for in-depth interviews will be compensated for their time



### Join the learning sprint to improve the safety assessment process for kinship caregivers
- We want to design and recommend a safety assessment process that accommodates a 
   diverse array of kinship caregivers, while maintaining child safety. This assessment
   will focus on resolving issues, not disqualifying kinship caregivers.
- [Sign up here](https://airtable.com/shrcGOn0wWbb7lbJv)
    - We are especially looking for: current or former kinship caregivers;
      parents of children currently or formerly in foster care (especially fathers);
      tribal partners; and current child welfare workers who conduct safety assessments.
- Participants selected for in-depth interviews will be compensated for their time
`;

const FAQ = `
### When will these standards be finalized?

We intend to publish the first version of the Standards for Kinship Caregivers at
the same time as, or before, the final rule comes out.

### Who is developing these approval standards?

These standards are being developed by a group of national organizations including [A Second Chance Inc.](https://www.asecondchance-kinship.com/),
 [American Bar Association Center on Children and the Law](https://www.americanbar.org/groups/public_interest/child_law/),
 [Children’s Rights](https://www.childrensrights.org/),
 [CWPolicy](https://cwpolicy.com/),
 [Generations United](https://www.gu.org/),
 [National Association for Regulatory Administration](https://www.naralicensing.org/),
 [New America’s Resource Family Working Group](https://www.childwelfareplaybook.com/),
 and [Think of Us](https://www.thinkof-us.org/).

### Do I have to follow these standards?

No. These standards are only recommendations. But they are designed to make it 
easy for Title IV-E agencies to take advantage of this new federal flexibility to have 
distinct processes for supporting kinship caregivers.

### I have another question.

Great! Please [submit it here](https://app.smartsheet.com/b/form/a82cab78a6544383a6c1b6bffcbf3ce7).
`;

export default function KinshipCaregivers() {
  return (
    <Layout>
      <section>
        <Hero
          title="Standards for Kinship Caregivers"
          backgroundColor="white"
        />
      </section>
      <Breadcrumbs crumbLabel="Kinship Caregivers" />
      <GridContainer className="cwp-about">
        <Grid desktop={{ col: 3 }}>
          <SideAnchorNav
            items={[
              {
                to: `#about`,
                title: 'About',
              },
              {
                to: '#get-involved',
                title: 'Get involved',
              },
              {
                to: '#more-ways',
                title: 'More ways to get involved',
              },
              {
                to: '#faq',
                title: 'FAQ',
              },
            ]}
          />
        </Grid>
        <Grid
          className="usa-layout-docs__main usa-prose usa-layout-docs"
          id="main-content"
          desktop={{ col: 12 }}
        >
          <main className="cwp-main kinship-caregivers">
            <Grid id="about">
              <section>
                <h2 className="section-title">About</h2>
                <ReactMarkdown className="section-content">
                  {ABOUT}
                </ReactMarkdown>
              </section>
            </Grid>
            <Grid id="get-involved">
              <section>
                <h2 className="section-title">Get involved!</h2>
                <ReactMarkdown>{GET_INVOLVED}</ReactMarkdown>
              </section>
            </Grid>
            <Grid id="more-ways">
              <section>
                <h2 className="section-title">More ways to get involved</h2>
                <ReactMarkdown>{MORE_WAYS}</ReactMarkdown>
              </section>
            </Grid>
            <Grid id="faq">
              <section>
                <h2 className="section-title">FAQ</h2>
                <ReactMarkdown>{FAQ}</ReactMarkdown>
              </section>
            </Grid>
          </main>
        </Grid>
      </GridContainer>
    </Layout>
  );
}
