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

const HowItWorksPage = () => {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.squadhelpWorkContainer}>
          <div className={styles.namingPlatformContainer}>
            <span className={styles.spanPlatform}>
              World's #1 Naming Platform
            </span>
            <h1>How Does Squadhelp Work?</h1>
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
          <h2>3 Ways To Use Squadhelp</h2>
          <p>
            Squadhelp offers 3 ways to get you a perfect name for your business.
          </p>
        </div>
        <div className={styles.contestContainer}>
          <div className={styles.contests}>
            <LaunchContestSVG />
            <h3>Launch a Contest</h3>
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
            <h3>Explore Names For Sale</h3>
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
            <h3>Agency-level Managed Contests</h3>
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
        <div></div>
        <div>
          <div>
            <ContestWorkSVG />
            <h2>How Do Naming Contests Work?</h2>
          </div>
          <div>
            <div>
              <ChouseAgencySVG />
            </div>
            <div>
              <li>
                <span>1.</span>
                <p>
                  Fill out your Naming Brief and begin receiving name ideas in
                  minutes
                </p>
              </li>
              <li>
                <span>2.</span>
                <p>
                  Rate the submissions and provide feedback to creatives.
                  Creatives submit even more names based on your feedback.
                </p>
              </li>
              <li>
                <span>3.</span>
                <p>
                  Our team helps you test your favorite names with your target
                  audience. We also assist with Trademark screening.
                </p>
              </li>
              <li>
                <span>4.</span>
                <p>Pick a Winner. The winner gets paid for their submission.</p>
              </li>
            </div>
          </div>
        </div>
        <div>
          <ul>
            <a href='#contest'>Launching A Contest</a>
            <a href='#marketplace'>Buying From Marketplace</a>
            <a href='#managed'>Managed Contests</a>
            <a href='#creatives'>For Creatives</a>
          </ul>
          <div id='contest'>
            <h3>Launching A Contest</h3>
            <button>
              How long does it take to start receiving submissions?
              <div>
                For Naming contests, you will start receiving your submissions
                within few minutes of launching your contest. Since our
                creatives are located across the globe, you can expect to
                receive submissions 24 X 7 throughout the duration of the
                brainstorming phase.
              </div>
            </button>
            <button>
              How long do Naming Contests last?
              <div>
                You can choose a duration from 1 day to 7 days. We recommend a
                duration of 3 Days or 5 Days. This allows for sufficient time
                for entry submission as well as brainstorming with creatives. If
                you take advantage of our validation services such as Audience
                Testing and Trademark Research, both will be an additional 4-7
                days (3-5 business days for Audience Testing and 1-2 business
                days for Trademark Research).
              </div>
            </button>
            <button>
              Where are the creatives located?
              <div>
                About 70% of our Creatives are located in the United States and
                other English speaking countries (i.e. United Kingdom, Canada,
                and Australia.). We utilize an advanced rating score algorithm
                to ensure that high quality creatives receive more opportunities
                to participate in our contests.
              </div>
            </button>
            <button>
              What if I do not like any submissions?
              <div>
                While it is unusually rare that you will not like any names
                provided, we have a few options in case this problem occurs: If
                the contest ends and you have not yet found a name that you'd
                like to move forward with, we can provide complimentary
                extension of your contest as well as a complimentary
                consultation with one of our branding consultants (a $99 value).
                By exploring our premium domain marketplace you can apply the
                contest award towards the purchase of any name listed for sale.
                If you choose the Gold package or Platinum package and keep the
                contest as "Not Guaranteed", you can request a partial refund if
                you choose not to move forward with any name from you project.
                (Please note that the refund is for the contest award). Here is
                a link to our <a href='http://www.google.com'>Refund Policy</a>
              </div>
            </button>
            <button>
              How much does it cost?
              <div>
                Our naming competitions start at $299, and our logo design
                competitions start at $299. Also, there are three additional
                contest level that each offer more features and benefits. See
                our <a href='http://www.google.com'>Refund Policy</a> for
                details
              </div>
            </button>
            <button>
              I need both a Name and a Logo. Do you offer any discount for
              multiple contests?
              <div>
                Yes! We have many contest bundles - our most popular being our
                Name, Tagline, and Logo bundle. Bundles allow you to purchase
                multiple contests at one time and save as much as from $75 -
                $400. You can learn more about our bundle options on our
                <a href='http://www.google.com'>Refund Policy</a>.
              </div>
            </button>
            <button>
              What if I want to keep my business idea private?
              <div>
                You can select a Non Disclosure Agreement (NDA) option at the
                time of launching your competition. This will ensure that only
                those contestants who agree to the NDA will be able to read your
                project brief and participate in the contest. The contest
                details will be kept private from other users, as well as search
                engines.
              </div>
            </button>
            <button>
              Can you serve customers outside the US?
              <div>
                Absolutely. Squadhelp services organizations across the globe.
                Our customer come from many countries, such as the United
                States, Australia, Canada, Europe, India, and MENA. We've helped
                more than 25,000 customer around the world.
              </div>
            </button>
            <button>
              Can I see any examples?
              <div>
                Our creatives have submitted more than 6 Million names and
                thousands of logos on our platform. Here are some examples of
                Names, Taglines, and Logos that were submitted in recent
                contests.
                <a href='http://www.google.com'>Name Examples</a>
                <a href='http://www.google.com'>Tagline Examples</a>
                <a href='http://www.google.com'>Logo Examples</a>
              </div>
            </button>
          </div>
          <div id='marketplace'>
            <h3>Buying From Marketplace</h3>
            <button>
              What's included with a Domain Purchase?
              <div>
                When you purchase a domain from our premium domain marketplace,
                you will receive the exact match .com URL, a complimentary logo
                design (along with all source files), as well as a complimentary
                Trademark report and Audience Testing if you're interested in
                validating your name.
              </div>
            </button>
            <button>
              How does the Domain transfer process work?
              <div>
                Once you purchase a Domain, our transfer specialists will reach
                out to you (typically on the same business day). In most cases
                we can transfer the domain to your preferred registrar (such as
                GoDaddy). Once we confirm the transfer details with you, the
                transfers are typically initiated to your account within 1
                business day.
              </div>
            </button>
            <button>
              If I purchase a Domain on installments, can I start using it to
              setup my website?
              <div>
                We offer payment plans for many domains in our Marketplace. If
                you purchase a domain on a payment plan, we hold the domain in
                an Escrow account until it is fully paid off. However our team
                can assist you with making any changes to the domains (such as
                Nameserver changes), so that you can start using the domain
                right away after making your first installment payment.
              </div>
            </button>
          </div>
          <div id='managed'>
            <h3>Managed Contests</h3>
            <button>
              What are Managed Contests?
              <div>
                The 'Managed' option is a fully managed service by Squadhelp
                Branding experts. It includes a formal brief preparation by
                Squadhelp team and management of your contest. Managed Contests
                are a great fit for companies that are looking for an "Agency"
                like experience and they do not want to manage the contest
                directly. Our branding team has directly managed hundreds of
                branding projects and has learned several best practices that
                lead to successful project outcomes. Our team will apply all
                best practices towards the management of your branding project.
                Learn more about our{' '}
                <a href='www.google.com'>Managed Contest Service</a>
              </div>
            </button>
            <button>
              What's a typical timeline for a Managed Contest?
              <div>
                The overall process takes 12-13 days.
                <ul>
                  <li>
                    The Managed projects start with a project kick-off call with
                    your Branding Consultant. You can schedule this call online
                    immediately after making your payment.
                  </li>
                  <li>
                    After your kick-off call, the Branding consultant will write
                    your project brief and send for your approval within 1
                    business day.
                  </li>
                  <li>
                    Upon your approval, the contest will go live. The branding
                    consultant will help manage your project throughout the
                    brainstorming phase (typically 5 days).
                  </li>
                  <li>
                    Upon the completion of brainstorming phase, the branding
                    consultant will work with you to test the top 6 names from
                    your Shortlist (3-5 Days). In addition, the branding
                    consultant will coordinate the detailed Trademark screening
                    (1-3 days)
                  </li>
                </ul>
              </div>
            </button>
            <button>
              How much do Managed Contests cost?
              <div>
                We offer two levels of Managed Contests. Standard ($1499) and
                Enterprise ($2999). The Enterprise managed contest includes:
                <ul>
                  <li>
                    (1) a $500 award amount (instead of $300), which will
                    attract our top Creatives and provide more options to choose
                    from;
                  </li>
                  <li>
                    (2) we will ensure a senior member of our branding team is
                    assigned to your project and the branding team will invest
                    about 3X more time in the day-to-day management of your
                    project;
                  </li>
                  <li>
                    (3) you will receive more high-end trademark report and 5X
                    more responses for your audience test.
                  </li>
                  <li>
                    Here is a link to our{' '}
                    <a href='www.google.com'>Pricing page</a> with a detailed
                    comparison of the two packages.
                  </li>
                </ul>
              </div>
            </button>
            <button>
              Where are the Branding Consultants located?
              <div>
                All our branding consultants are based in in our Headquarters
                (Hoffman Estates, IL). Our branding consultants have many years
                of experience in managing hundreds of branding projects for
                companies ranging from early stage startups to Fortune 500
                corporations.
              </div>
            </button>
          </div>
          <div id='creatives'>
            <h3>For Creatives</h3>
            <button>
              Can anyone join your platform?
              <div>
                We are open to anyone to signup. However, we have an extensive "
                <a a href='http://www.google.com' target='_blank'>
                  Quality Scoring
                </a>
                " process which ensures that high quality creatives have the
                ability to continue to participate in the platform. On the other
                hand, we limit the participation from those creatives who do not
                consistently receive high ratings.
              </div>
            </button>
            <button>
              Can I start participating immediately upon signing up?
              <div>
                When you initially signup, you are assigned few contests to
                assess your overall quality of submissions. Based upon the
                quality of your submissions, you will continue to be assigned
                additional contests. Once you have received enough high ratings
                on your submissions, your account will be upgraded to "Full
                Access", so that you can begin participating in all open
                contests.
              </div>
            </button>
            <button>
              How Do I Get Paid?
              <div>
                We handle creative payouts via Paypal or Payoneer. Depending
                upon your country of residence, we may require additional
                documentation to verify your identity as well as your Tax
                status.
              </div>
            </button>
          </div>
        </div>
        <div>
          <h3>Ready to get started?</h3>
          <p>
            Fill out your contest brief and begin receiving custom name
            suggestions within minutes.
          </p>
          <Link className={styles.startContestBtn} to='/startContest'>
            START CONTEST
          </Link>
        </div>
        <div>
          <div>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.png`} alt='stars' />
            <p>
              <span>4.9 out of 5 stars</span> from 25,000+ customers.
            </p>
          </div>
          <div>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}avatars.jpg`}
              alt='avatars'
            />
            <p>
              Our branding community stands <span>200,000+</span> strong.
            </p>
          </div>
          <div>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.png`}
              alt='sharing-files'
            />
            <p>
              <span>140+ Industries</span> supported across more than{' '}
              <span>85 countries</span> – and counting.
            </p>
          </div>
          <div>
            <div>
              <li>
                <span>стрелка</span>
                <h3>Pay a Fraction of cost vs hiring an agency</h3>
                <p>
                  For as low as $199, our naming contests and marketplace allow
                  you to get an amazing brand quickly and affordably.
                </p>
              </li>
              <li> линия</li>
              <li>
                <span>стрелка</span>
                <h3>Satisfaction Guarantee</h3>
                <p>
                  Of course! We have policies in place to ensure that you are
                  satisfied with your experience.{' '}
                  <a href='http://www.google.com'> Learn more</a>
                </p>
              </li>
            </div>
            <div>
              <div>
                <h4>Questions?</h4>
                <p>
                  Speak with a Squadhelp platform expert to learn more and get
                  your questions answered.
                </p>
                <button>Schedule Consultation</button>
                <a href={`${CONSTANTS.CONTACT_INFO.TEL}`}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}phone_icon.png`}
                    alt='phone_icon'
                  />
                  <span>{CONSTANTS.CONTACT_INFO.TEL}</span>
                </a>{' '}
                <span>Call us for assistance</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h6>Featured In</h6>
          </div>
          <div>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/Forbes-inactive.png`}
              alt='Forbes-inactive'
            />
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/the_next_web_inactive.png`}
              alt='TNW'
            />
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/chicago_inactive.png`}
              alt='Chicago'
            />
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/mashable-inactive.png`}
              alt='Mashable'
            />
          </div>
        </div>
        <div>
          <div>
            <h2>Services</h2>
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
            <li>
              <a href='http://www.google.com'>3 Letter Domains</a>
            </li>
            <li>
              <a href='http://www.google.com'>4 Letter Domains</a>
            </li>
            <li>
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
          </div>
          <div>
            <h2>Tools</h2>
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
          </div>
          <div>
            <h2>SquadHelp</h2>
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
          </div>
          <div>
            <h2>Creatives</h2>
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
            <h2>Legal</h2>
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
        </div>
        <div>
          <h2>Trending Searches</h2>
          <div>
            <p>
              Explore our unique, hand-picked brand & business names for sale
              along with a matching, premium domain name. Buy instantly for a
              fixed low price.
            </p>
            <input></input>
            <button></button>
          </div>
          <div>
            <div>
              <a href='http://www.google.com'>
                <ShortNamesSVG />
                <span>Short Names</span>
              </a>
            </div>
            <div>
              <a href='http://www.google.com'>
                <ShortNamesSVG />
                <span>One Word</span>
              </a>
            </div>
            <div>
              <a href='http://www.google.com'>
                <ShortNamesSVG />
                <span>4-letter</span>
              </a>
            </div>
            <div>
              <a href='http://www.google.com'>
                <ShortNamesSVG />
                <span>5-letter</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span>Copyright © 2023 Squadhelp Inc</span>
          </div>
          <div>
            <a href='http://www.google.com'>
              <span>
                Squadhelp.com has a Shopper Approved rating of 4.9/5 based on
                2782 ratings and reviews
              </span>
            </a>
          </div>
          <div>
            <LinkedInSVG />
            <InstagramSVG />
            <TwitterSVG />
            <FacebookSVG />
          </div>
        </div>
      </div>
    </>
  )
}

export default HowItWorksPage
