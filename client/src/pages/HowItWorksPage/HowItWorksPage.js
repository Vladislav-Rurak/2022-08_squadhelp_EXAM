import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../HowItWorksPage/HowItWorksPage.module.sass'
import Header from '../../components/Header/Header'
import SquadhelpWorksSVG from '../../components/svg/SquadhelpWorkSVG/SquadhelpWorkSVG'
import LaunchContestSVG from '../../components/svg/LaunchContestSVG/LaunchContestSVG'
import ExploreNamesSVG from '../../components/svg/ExploreNamesSVG/ExploreNamesSVG'
import ManagesContestSVG from '../../components/svg/ManagesContestSVG/ManagesContestSVG'
import ContestWorkSVG from '../../components/svg/ContestWorkSVG/ContestWorkSVG'
import ChouseAgencySVG from '../../components/svg/GhouseAgencySVG/ChouseAgencySVG'
import CONSTANTS from '../../constants'
import ShortNamesSVG from '../../components/svg/ShortNamesSVG/ShortNamesSVG'
import LinkedInSVG from '../../components/svg/LinkedInSVG/LinkedInSVG'
import InstagramSVG from '../../components/svg/InstagramSVG/InstagramSVG'
import FacebookSVG from '../../components/svg/FacebookSVG/FacebookSVG'
import TwitterSVG from '../../components/svg/TwitterSVG/TwitterSVG'
import ToogleTextButtom from '../../components/ToogleTextButtom/ToogleTextButtom'
import GetStartedSVG from '../../components/svg/GetStartedSVG/GetStartedSVG'
import SheetSVG from '../../components/svg/SheetSVG/SheetSVG'
import SearchSVG from '../../components/svg/SearchSVG/SearchSVG'

const HowItWorksPage = () => {
  const submissionslistItem = [
    `If you choose the Gold package or Platinum
  package and keep the contest as "Not Guaranteed", you can
  request a partial refund if you choose not to move forward
  with any name from you project. (Please note that the refund
  is for the contest award). Here is a link to our `,
    <a href='http://www.google.com'>Refund Policy</a>
  ]
  const submissionslistItems = [
    `If the contest ends and you have not yet found a name that
  you'd like to move forward with, we can provide complimentary
  extension of your contest as well as a complimentary
  consultation with one of our branding consultants (a $99
  value).`,
    `By exploring our premium domain marketplace you can
  apply the contest award towards the purchase of any name
  listed for sale.`,
    submissionslistItem
  ]
  const contestExample = [
    <a href='http://www.google.com'>Name Examples</a>,
    <a href='http://www.google.com'>Tagline Examples</a>,
    <a href='http://www.google.com'>Logo Examples</a>
  ]
  const managedContestsListItems = [
    `The Managed projects start with a project kick-off call
  with your Branding Consultant. You can schedule this call
  online immediately after making your payment.`,
    `After your kick-off call, the Branding consultant will
  write your project brief and send for your approval within
  1 business day.`,
    `Upon your approval, the contest will go live. The branding
  consultant will help manage your project throughout the
  brainstorming phase (typically 5 days).`,
    `Upon the completion of brainstorming phase, the branding
  consultant will work with you to test the top 6 names from
  your Shortlist (3-5 Days). In addition, the branding
  consultant will coordinate the detailed Trademark
  screening (1-3 days)`
  ]
  const contestCostListItem = [
    ` Here is a link to our `,
    <a href='www.google.com'>Pricing page</a>,
    ` with a detailed
  comparison of the two packages.`
  ]
  const contestCostListItems = [
    `(1) a $500 award amount (instead of $300), which will
  attract our top Creatives and provide more options to
  choose from;`,
    `(2) we will ensure a senior member of our branding team is
  assigned to your project and the branding team will invest
  about 3X more time in the day-to-day management of your
  project;`,
    `(3) you will receive more high-end trademark report and 5X
  more responses for your audience test.`,
    contestCostListItem
  ]
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.squadhelpWorkContainer}>
          <div className={styles.namingPlatformContainer}>
            <span className={styles.spanPlatform}>
              World's #1 Naming Platform
            </span>
            <h1 className={styles.title}>How Does Squadhelp Work?</h1>
            <p className={styles.squadhelpHelps}>
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>{' '}
            <div>
              <a href='https://vimeo.com/826948811' className={styles.video}>
                <small className='fas fa-play mr-2'></small> Play Video
              </a>
            </div>
          </div>
          <div className={styles.squadhelpWorksSVG}>
            <SquadhelpWorksSVG />
          </div>
        </div>
        <div className={styles.outServicesContainer}>
          <div>
            <span className={styles.spanServices}>Out Services</span>
          </div>
          <h2 className={styles.h2Ways}>3 Ways To Use Squadhelp</h2>
          <p className={styles.squadhelpOffers}>
            Squadhelp offers 3 ways to get you a perfect name for your business.
          </p>
        </div>
        <div className={styles.contestContainer}>
          <div className={styles.contests}>
            <LaunchContestSVG />
            <h3 className={styles.contestsHeader}>Launch a Contest</h3>
            <p>
              Work with hundreds of creative experts to get c ustom name
              suggestions for your business or brand. All names are auto-checked
              for URL availability.
            </p>
            <a href='/startContest' className={styles.contestBtn}>
              Launch a Contest
            </a>
          </div>
          <div className={styles.contests}>
            <ExploreNamesSVG />
            <h3 className={styles.contestsHeader}>Explore Names For Sale</h3>
            <p>
              Our branding team has curated thousands of pre-made names that you
              can purchase instantly. All names include a matching URL and a
              complimentary Logo Design
            </p>
            <a href='http://www.google.com' className={styles.contestBtn}>
              Explore Names For Sale
            </a>
          </div>
          <div className={styles.contests}>
            <ManagesContestSVG />
            <h3 className={styles.contestsHeader}>
              Agency-level Managed Contests
            </h3>
            <p>
              Our Managed contests combine the power of crowdsourcing with the
              rich experience of our branding consultants. Get a complete
              agency-level experience at a fraction of Agency costs
            </p>
            <a href='http://www.google.com' className={styles.contestBtn}>
              Learn more
            </a>
          </div>
        </div>
        <div className={styles.namingContestContainer}>
          <div className={styles.contestsWork}>
            <ContestWorkSVG />
            <h2 className={styles.h3Contests}>How Do Naming Contests Work?</h2>
          </div>
          <div className={styles.chouseAgency}>
            <ul className={styles.stepsContainer}>
              <li className={styles.listContest}>
                <div className={styles.numberContainer}>
                  <span className={styles.stepNumber}>1.</span>
                  <p className={styles.steps}>
                    Fill out your Naming Brief and begin receiving name ideas in
                    minutes
                  </p>
                </div>
              </li>
              <li className={styles.listContest}>
                <div className={styles.numberContainer}>
                  <span className={styles.stepNumber}>2.</span>
                  <p className={styles.steps}>
                    Rate the submissions and provide feedback to creatives.
                    Creatives submit even more names based on your feedback.
                  </p>
                </div>
              </li>
              <li className={styles.listContest}>
                <div className={styles.numberContainer}>
                  <span className={styles.stepNumber}>3.</span>
                  <p className={styles.steps}>
                    Our team helps you test your favorite names with your target
                    audience. We also assist with Trademark screening.
                  </p>
                </div>
              </li>
              <li className={styles.listContest}>
                <div className={styles.numberContainer}>
                  <span className={styles.stepNumber}>4.</span>
                  <p className={styles.steps}>
                    Pick a Winner. The winner gets paid for their submission.
                  </p>
                </div>
              </li>
            </ul>
            <div className={styles.chouseAgencySVG}>
              <ChouseAgencySVG />
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.navigationListContainer}>
            <ul className={styles.navigationList}>
              <a href='#contest' className={styles.listGroupItems}>
                Launching A Contest
              </a>
              <a href='#marketplace' className={styles.listGroupItems}>
                Buying From Marketplace
              </a>
              <a href='#managed' className={styles.listGroupItems}>
                Managed Contests
              </a>
              <a href='#creatives' className={styles.listGroupItems}>
                For Creatives
              </a>
            </ul>
          </div>
          <div className={styles.buttonGroupContainer}>
            <div id='contest' className={styles.buttonGroupContest}>
              <h3 className={styles.h3Header}>Launching A Contest</h3>
              <ToogleTextButtom
                initialText='How long does it take to start receiving submissions?'
                visibleText='For Naming contests, you will start receiving your submissions
              within few minutes of launching your contest. Since our
              creatives are located across the globe, you can expect to
              receive submissions 24 X 7 throughout the duration of the
              brainstorming phase.'
              />
              <ToogleTextButtom
                initialText='How long do Naming Contests last?'
                visibleText='You can choose a duration from 1 day to 7 days. We recommend a
              duration of 3 Days or 5 Days. This allows for sufficient time
              for entry submission as well as brainstorming with creatives.
              If you take advantage of our validation services such as
              Audience Testing and Trademark Research, both will be an
              additional 4-7 days (3-5 business days for Audience Testing
              and 1-2 business days for Trademark Research).'
              />
              <ToogleTextButtom
                initialText='Where are the creatives located?'
                visibleText='About 70% of our Creatives are located in the United States
                and other English speaking countries (i.e. United Kingdom,
                Canada, and Australia.). We utilize an advanced rating score
                algorithm to ensure that high quality creatives receive more
                opportunities to participate in our contests.'
              />
              <ToogleTextButtom
                initialText='What if I do not like any submissions?'
                visibleText='While it is unusually rare that you will not like any names
                provided, we have a few options in case this problem occurs:'
                listItems={submissionslistItems}
              />
              <ToogleTextButtom
                initialText=' How much does it cost?'
                visibleText={[
                  `Our naming competitions start at $299, and our logo design
                competitions start at $299. Also, there are three additional
                contest level that each offer more features and benefits. See
                our `,
                  <a href='http://www.google.com'>Refund Policy</a>,
                  ` for details`
                ]}
              />
              <ToogleTextButtom
                initialText='I need both a Name and a Logo. Do you offer any discount for
              multiple contests?'
                visibleText={[
                  `Yes! We have many contest bundles - our most popular being our
                Name, Tagline, and Logo bundle. Bundles allow you to purchase
                multiple contests at one time and save as much as from $75 -
                $400. You can learn more about our bundle options on our `,
                  <a href='http://www.google.com'>Refund Policy</a>
                ]}
              />
              <ToogleTextButtom
                initialText='What if I want to keep my business idea private?'
                visibleText={`You can select a Non Disclosure Agreement (NDA) option at the
                  time of launching your competition. This will ensure that only
                  those contestants who agree to the NDA will be able to read
                  your project brief and participate in the contest. The contest
                  details will be kept private from other users, as well as
                  search engines.`}
              />
              <ToogleTextButtom
                initialText='Can you serve customers outside the US?'
                visibleText={`Absolutely. Squadhelp services organizations across the globe.
                Our customer come from many countries, such as the United
                States, Australia, Canada, Europe, India, and MENA. We've
                helped more than 25,000 customer around the world.`}
              />
              <ToogleTextButtom
                initialText='Can I see any examples?'
                visibleText={`Our creatives have submitted more than 6 Million names and
                thousands of logos on our platform. Here are some examples of
                Names, Taglines, and Logos that were submitted in recent
                contests.`}
                listItems={contestExample}
              />
            </div>
            <div id='marketplace' className={styles.buttonGroupContest}>
              <h3 className={styles.h3Header}>Buying From Marketplace</h3>
              <ToogleTextButtom
                initialText='What`s included with a Domain Purchase?'
                visibleText={`When you purchase a domain from our premium domain
                marketplace, you will receive the exact match .com URL, a
                complimentary logo design (along with all source files), as
                well as a complimentary Trademark report and Audience Testing
                if you're interested in validating your name.`}
              />
              <ToogleTextButtom
                initialText='How does the Domain transfer process work?'
                visibleText={`Once you purchase a Domain, our transfer specialists will
                reach out to you (typically on the same business day). In most
                cases we can transfer the domain to your preferred registrar
                (such as GoDaddy). Once we confirm the transfer details with
                you, the transfers are typically initiated to your account
                within 1 business day.`}
              />
              <ToogleTextButtom
                initialText='If I purchase a Domain on installments, can I start using it to
                setup my website?'
                visibleText={`We offer payment plans for many domains in our Marketplace. If
                you purchase a domain on a payment plan, we hold the domain in
                an Escrow account until it is fully paid off. However our team
                can assist you with making any changes to the domains (such as
                Nameserver changes), so that you can start using the domain
                right away after making your first installment payment.`}
              />
            </div>
            <div id='managed' className={styles.buttonGroupContest}>
              <h3 className={styles.h3Header}>Managed Contests</h3>
              <ToogleTextButtom
                initialText='What are Managed Contests?'
                visibleText={[
                  `The 'Managed' option is a fully managed service by Squadhelp
                Branding experts. It includes a formal brief preparation by
                Squadhelp team and management of your contest. Managed
                Contests are a great fit for companies that are looking for an
                "Agency" like experience and they do not want to manage the
                contest directly. Our branding team has directly managed
                hundreds of branding projects and has learned several best
                practices that lead to successful project outcomes. Our team
                will apply all best practices towards the management of your
                branding project. Learn more about our `,
                  <a href='www.google.com'>Managed Contest Service</a>
                ]}
              />
              <ToogleTextButtom
                initialText='What`s a typical timeline for a Managed Contest?'
                visibleText={`The overall process takes 12-13 days.`}
                listItems={managedContestsListItems}
              />
              <ToogleTextButtom
                initialText='How much do Managed Contests cost?'
                visibleText={`We offer two levels of Managed Contests. Standard ($1499) and
                Enterprise ($2999). The Enterprise managed contest includes:`}
                listItems={contestCostListItems}
              />
              <ToogleTextButtom
                initialText='Where are the Branding Consultants located?'
                visibleText={`All our branding consultants are based in in our Headquarters
                (Hoffman Estates, IL). Our branding consultants have many
                years of experience in managing hundreds of branding projects
                for companies ranging from early stage startups to Fortune 500
                corporations.`}
              />
            </div>
            <div id='creatives' className={styles.buttonGroupContest}>
              <h3 className={styles.h3Header}>For Creatives</h3>
              <ToogleTextButtom
                initialText='Can anyone join your platform?'
                visibleText={[
                  ` We are open to anyone to signup. However, we have an extensive
                "`,
                  <a
                    a
                    href='http://www.google.com'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Quality Scoring
                  </a>,
                  `" process which ensures that high quality creatives have the
                  ability to continue to participate in the platform. On the
                  other hand, we limit the participation from those creatives
                  who do not consistently receive high ratings.`
                ]}
              />
              <ToogleTextButtom
                initialText='Can I start participating immediately upon signing up?'
                visibleText={`When you initially signup, you are assigned few contests to
                assess your overall quality of submissions. Based upon the
                quality of your submissions, you will continue to be assigned
                additional contests. Once you have received enough high
                ratings on your submissions, your account will be upgraded to
                "Full Access", so that you can begin participating in all open
                contests.`}
              />
              <ToogleTextButtom
                initialText='How Do I Get Paid?'
                visibleText={`We handle creative payouts via Paypal or Payoneer. Depending
                upon your country of residence, we may require additional
                documentation to verify your identity as well as your Tax
                status.`}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.backgroundContainer}>
            <div className={styles.getStartedSVG}>
              <GetStartedSVG />
            </div>
            <div className={styles.sheetSVG}>
              <SheetSVG />
            </div>
          </div>
          <div className={styles.getStartedContainer}>
            <h3 className={styles.headerStarted}>Ready to get started?</h3>
            <p className={styles.paragraphStarted}>
              Fill out your contest brief and begin receiving custom name
              suggestions within minutes.
            </p>
            <Link className={styles.startContestButton} to='/startContest'>
              Start A Contest
            </Link>
          </div>
        </div>
        <div className={styles.imagesContainer}>
          <div className={styles.imageContainer}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.png`}
              alt='stars'
              className={styles.lazyImage}
            />
            <p>
              <span>4.9 out of 5 stars</span> from 25,000+ customers.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}avatars.png`}
              alt='avatars'
              className={styles.avatars}
            />
            <p>
              Our branding community stands <span>200,000+</span> strong.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.png`}
              alt='sharing-files'
              className={styles.lazyImage}
            />
            <p>
              <span>140+ Industries</span> supported across more than{' '}
              <span>85 countries</span> – and counting.
            </p>
          </div>
        </div>
        <div className={styles.questionsContainer}>
          <div className={styles.ensureContainer}>
            <ul className={styles.ulInfo}>
              <li className={styles.liInfo}>
                <span className={styles.thinArrow}>&gt;</span>
                <div>
                  <h3>Pay a Fraction of cost vs hiring an agency</h3>
                  <p>
                    For as low as $199, our naming contests and marketplace
                    allow you to get an amazing brand quickly and affordably.
                  </p>
                </div>
              </li>
              <li className={(styles.topBorder, styles.liInfo)}>
                <span className={styles.thinArrow}>&gt;</span>
                <div>
                  <h3>Satisfaction Guarantee</h3>
                  <p>
                    Of course! We have policies in place to ensure that you are
                    satisfied with your experience.{' '}
                    <a href='http://www.google.com'> Learn more</a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div className={styles.expertContainer}>
              <h4>Questions?</h4>
              <p>
                Speak with a Squadhelp platform expert to learn more and get
                your questions answered.
              </p>
              <button className={styles.consultationBtn}>
                Schedule Consultation
              </button>
              <a
                href={`${CONSTANTS.CONTACT_INFO.TEL}`}
                className={styles.contactNumberInfo}
              >
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}phone_icon.png`}
                  alt='phone_icon'
                />
                <span className={styles.contactNumber}>
                  &nbsp;&nbsp;{CONSTANTS.CONTACT_INFO.TEL}
                </span>
              </a>
              <span>Call us for assistance</span>
            </div>
          </div>
        </div>
        <div className={styles.sponsorContainer}>
          <div className={styles.featuredHeader}>
            <h6>Featured In</h6>
          </div>
          <div className={styles.sponsorImageContainer}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/Forbes-inactive.png`}
              alt='Forbes-inactive'
              className={styles.sponsors}
            />
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/the_next_web_inactive.png`}
              alt='TNW'
              className={styles.sponsors}
            />
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/chicago_inactive.png`}
              alt='Chicago'
              className={styles.sponsors}
            />
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/mashable-inactive.png`}
              alt='Mashable'
              className={styles.sponsors}
            />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.linkContainer}>
            <div>
              <h2 className={styles.headerInfo}>Services</h2>
              <ul className={styles.linkUlInfo}>
                <li>
                  <a href='http://www.google.com'>Premium Domains For Sale</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Crowdsource Naming</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Naming Agency</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Brandable Domains</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Short Domains</a>
                </li>
                <li className={styles.indentedList}>
                  <a href='http://www.google.com'>3 Letter Domains</a>
                </li>
                <li className={styles.indentedList}>
                  <a href='http://www.google.com'>4 Letter Domains</a>
                </li>
                <li className={styles.indentedList}>
                  <a href='http://www.google.com'>5 Letter Domains</a>
                </li>
                <li>
                  <a href='http://www.google.com'>One Word Domains</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Industry Domains</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Agency Services</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Logo Contests</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Tagline Contests</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Trademark Filing Service</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Audience Test</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={styles.headerInfo}>Tools</h2>
              <ul className={styles.linkUlInfo}>
                <li>
                  <a href='http://www.google.com'>Business Name Generator</a>
                </li>
                <li>
                  <a href='http://www.google.com'>How to Name Your Business</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Free Trademark Checker</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Branding Blog</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Business Naming eBook</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Startup Toolkit</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={styles.headerInfo}>SquadHelp</h2>
              <ul className={styles.linkUlInfo}>
                <li>
                  <a href='http://www.google.com'>About</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Contact</a>
                </li>
                <li>
                  <a href='http://www.google.com'>How It Works</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Testimonials</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Our Work</a>
                </li>
                <li>
                  <a href='http://www.google.com'>Help & FAQs</a>
                </li>
              </ul>
            </div>
            <div>
              <ul className={styles.linkUlInfo}>
                <div>
                  <h2 className={styles.headerInfo}>Creatives</h2>
                  <li>
                    <a href='http://www.google.com'>Get Started</a>
                  </li>
                  <li>
                    <a href='http://www.google.com'>Help & FAQs</a>
                  </li>
                  <li>
                    <a href='http://www.google.com'>Domain Selling Info</a>
                  </li>
                  <li>
                    <a href='http://www.google.com'>Discussion Forum</a>
                  </li>
                </div>
                <div className={styles.legalContainer}>
                  <h2 className={styles.headerInfo}>Legal</h2>
                  <li>
                    <a href='http://www.google.com'>Terms of Service</a>
                  </li>
                  <li>
                    <a href='http://www.google.com'>Privacy Policy</a>
                  </li>
                  <li>
                    <a href='http://www.google.com'>Cookie Policy</a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className={styles.footerContainer}>
            <div className={styles.trendingContainer}>
              <h2 className={styles.trendingHeader}>Trending Searches</h2>
              <p>
                Explore our unique, hand-picked brand & business names for sale
                along with a matching, premium domain name. Buy instantly for a
                fixed low price.
              </p>
              <div className={styles.inputContainer}>
                <input
                  placeholder='Search over 75,000 Names'
                  className={styles.input}
                ></input>
                <button className={styles.searchBtn}>
                  <SearchSVG />
                </button>
              </div>
            </div>
            <div className={styles.linkSVG}>
              <div>
                <a href='http://www.google.com'>
                  <ShortNamesSVG />
                  <span className={styles.linkHref}>Short Names</span>
                </a>
              </div>
              <div>
                <a href='http://www.google.com'>
                  <ShortNamesSVG />
                  <span className={styles.linkHref}>One Word</span>
                </a>
              </div>
              <div className={styles.fourLetter}>
                <a href='http://www.google.com'>
                  <ShortNamesSVG />
                  <span className={styles.linkHref}>4-letter</span>
                </a>
              </div>
              <div className={styles.fiveLetter}>
                <a href='http://www.google.com'>
                  <ShortNamesSVG />
                  <span className={styles.linkHref}>5-letter</span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footerInfo}>
            <span className={styles.inc}>Copyright © 2023 Squadhelp Inc</span>
            <div className={styles.divShooper}>
              <a href='http://www.google.com'>
                <span className={styles.shooper}>
                  Squadhelp.com has a Shopper Approved rating of 4.9/5 based on
                  2782 ratings and reviews
                </span>
              </a>
            </div>
            <div className={styles.socialMedia}>
              <LinkedInSVG />
              <InstagramSVG />
              <TwitterSVG />
              <FacebookSVG />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowItWorksPage
