import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SideAnchorNav from '../components/side-anchor-nav/SideAnchorNav';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import './home.scss';

const ABOUT = `
A [new rule](https://www.federalregister.gov/documents/2023/09/28/2023-21081/separate-licensing-or-approval-standards-for-relative-or-kinship-foster-family-homes) published by the Administration for Children and Families on 09/28/2023 will, for the first time, allow title IV-E agencies to adopt kin-specific licensing or approval standards for kinship foster family homes.

A title IV-E agency’s kin-specific licensing or approval standards must be “reasonably in accord with recommended standards of national organizations.”

**The new [Kin-Specific Foster Home Approval Standards](https://docs.google.com/document/d/1V30W6Ft_uEUpVIQ062wPh12HrYHNod0b43T25wrp190/edit)** will serve as these “recommended standards of national organizations,” similar to how the [Model Foster Home Licensing Standards](https://nara.memberclicks.net/nara-model-foster-care-standards) served as the recommended standards for the previous combined (kin and non-kin) process. 

The Kin-Specific Foster Home Approval Standards respect the unique circumstances of kin caregivers, removing many historic barriers and striving to make the approval process warmer and more flexible for kin caregivers. We worked closely with kin caregivers, subject matter experts, and at least 45 title IV-E agencies to develop these model standards and implementation guidance.

The Kin-Specific Foster Home Approval Standards include standard background checks, a caregiver suitability assessment, and a safety and needs assessment. **That’s it.** It intentionally does not recommend requirements such as tuberculosis tests, medical exams, financial reviews, pet registrations, and other barriers that have kept children in foster care from living with people who love them.

In the majority of cases, once an agency adopts these new standards, they should be eligible to claim title IV-E reimbursement for foster care maintenance payments made on behalf of an otherwise-eligible child within days after placement, with the only post-placement delays being waiting for the fingerprint-based background check results and any applicable out-of-state child abuse and neglect registry check results.

The Kin-Specific Foster Home Approval Standards include implementation guidance and example template forms for optional agency use, to make it as simple as possible to adopt the standards.

The new rule applies to title IV-E agencies, which includes all states and tribes that have approved title IV-E plans or are operating the title IV-E program through a tribal-state agreement. The new rule is not applicable to tribes that do not operate the title IV-E program. We recognize the great diversity in Indian Country with 574 federally-recognized tribal nations and the sovereign authority of tribal nations to develop their own licensing standards. The recommended standards are, however, intended to provide examples of how state agencies can improve their kinship care licensing standards as they apply to a diverse group of children and families under their jurisdiction. 

`;

const GET_INVOLVED = `
- [Sign up for email updates](https://mailchi.mp/childwelfareplaybook/standards-for-kinship-caregivers)
- [Sign up for the launch webinar](https://www.gksnetwork.org/events/kin-specific-licensure-overview-of-new-federal-rule-release-of-recommended-standards/) on Wednesday, October 11 from 1-2p PT / 4-5p ET. The event will be recorded if you cannot attend live. 
- Share your feedback and questions on the model standards
`;

const FAQ = `
### When can I start using these standards?

We intend to pilot the Kin-Specific Foster Home Approval Standards with 6 agencies, and will 
provide regular updates throughout the pilot, beginning in Fall 2023. We will update the 
implementation materials and make clarifications as needed based on what we learn. We 
encourage you to follow along and begin your planning alongside these 6.

### Who is developing these approval standards?

These standards are being developed by a group of national organizations including [A Second Chance Inc.](https://www.asecondchance-kinship.com/),
 [American Bar Association Center on Children and the Law](https://www.americanbar.org/groups/public_interest/child_law/),
 [Children’s Rights](https://www.childrensrights.org/),
 [CWPolicy](https://cwpolicy.com/),
 [Generations United and its Grandfamilies & Kinship Support Network: A National Technical Assistance Center](https://www.gksnetwork.org/),
 [National Indian Child Welfare Association](https://www.nicwa.org/),
 [National Association for Regulatory Administration](https://www.naralicensing.org/),
 [New America’s Resource Family Working Group](https://www.childwelfareplaybook.com/),
 and [Think of Us](https://www.thinkof-us.org/).

### Do I have to follow these standards?

No. These standards are only recommendations. But they are designed to make it 
easy for Title IV-E agencies to take advantage of this new federal flexibility to have 
distinct processes for supporting kinship caregivers.

### I have another question.

Great! Please [submit it here](https://docs.google.com/forms/d/e/1FAIpQLSdGr6SFFzEZ6iKVlVEpeKnbYCuze5ldnpyPdqon8IaTatRbhQ/viewform) or email info (at) childwelfareplaybook.com.
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
