---
layout: layouts/strategy.liquid
templateEngineOverride: md,njk
title: Empower youth to make their own choices
tags: ["supporting-older-youth", "strategy"]
---

## Allow youth to explore and select programs available to them

Many youth do not know what programs are available to them. Case workers are often managing so many cases that they don’t always have time to explain every available program. This means that youth may miss out on opportunities to prepare for independence.{.t-large}

Instead of requiring case workers to explain each program directly, make it possible for older youth to look through a list of available programming and choose the topics most relevant to them.{.t-large}

### How to do this

Share a printed or emailed list of all programs with youth. Ask them to circle or highlight those that interest them.

You can also create a programming calendar online and allow youth to RSVP for programs of interest, using a free tool like Google Forms or Eventbrite.

    costs:
      - Free
    benefits:
      - Increases data on what programs are of most interest to youth (not just
        what youth attend).
      - Prevents youth from missing opportunities to prepare for independence

### Outcome data

We are still collecting concrete data.

    who:
      number: 0

## Self-service portal

A self-service portal for web and mobile devices allows foster youth (aged 14-17) and recently aged-out youth to confirm and update their contact information (including email, phone number, and address) for direct communication with Oklahoma’s Department of Human Services (OKDHS) and the Oklahoma Successful Adulthood (OKSA) program.{.t-large}

### How to do this

* How the portal works
  * Caseworkers or other appropriate agency staff members are responsible for the initial account creation in the portal for foster youth.
  * For security reasons, once the initial account has been created, the portal generates a one-time code (OTC). Youths are given the code in person or via phone by their case worker or other service agency staff.
  * Youths log in and complete the account setup using the one-time code with their updated contact information.
* Technical components and data flow
  * The portal contains its own lightweight storage solution to house local data and is not expected to replace OKDHS databases.
  * Updates to youth contact information will be sent by the portal to appropriate personnel via email.
  * Deduplication of accounts and address validation will be managed through manual processes rather than technical integration due to the expected low volume of records.
  * Data Privacy and Security
      * Enable accounts with role-based permissions to ensure that data is only accessible by appropriate, authorized individuals.
      * Incorporate data encryption and account-based access for data storage.
      * Require time-limited one-time codes for account creation.
* Promotion
  * Social media campaigns are the best way to reach youth and educate them about this portal, and remind them to keep their contact info up to date.
  * Facilitate outreach to youth from trusted connections (such as biological connections, foster peers, and community organizations) to raise awareness about the portal.
  * Promote during OKDHS and OKSA in-person events.
* Incentives
  * Provide small, immediate incentives to encourage youth to develop the habit of keeping their contact information current.
  * Solicit the help of non-profit groups and local businesses to gather donations of small incentives, such as gift cards, clothing, food coupons, or similar items.
* Operations
  * It is recommended that training for new and existing team members be led by the product owners of the chosen business system.
  * Reserve additional weekly or monthly time from  OKDHS and OKSA team members for the maintenance of records and accounts.

  costs:
    - Approx. $32,000 in development for the web portal
    - Approx. $78,000 in annual maintenance
  benefits:
    - Improves the ability of agencies to reach youth reliably, raising awareness of and participation in support programs.
    - Shifts the burden from the caseworkers (who are currently responsible for tracking, entering, and updating youths’ contact information in the case database) and minimizes continuity issues arising from high turnover among caseworkers.
    - It is a technically simple and low-cost system that meets the needs of OKDHS and foster youth, taking into account the expected volume of records, how often the records would be accessed, and the availability of the OKDHS team members.

### Who's doing this

This proposal was submitted for consideration to the State of Oklahoma’s Department of Human Services (OKDHS).

* Full project documents:
  * [Policy memo](https://www.aspentechpolicyhub.org/wp-content/uploads/Oklahoma-1-Memo-2023.pdf){target=_blank}
  * [Implementations and operations overview](https://www.aspentechpolicyhub.org/wp-content/uploads/Oklahoma-1-Implementation-Operations-Overview-2023.pdf){target=_blank}
  * [Self-service portal walkthrough video](https://vimeo.com/820718593/5bda54cf4d){target=_blank}
* [Aspen Tech Policy Hub: Improving the Outcomes of Youth Aging Out of Foster Care](https://www.aspentechpolicyhub.org/project/improving-the-outcomes-of-youth-aging-out-of-fostercare/){target=_blank}