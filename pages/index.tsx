import React, { useState } from 'react';
import type { GetStaticPropsResult, NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
// import '../styles/style.css';
import Button from '../components/Buttons/Button';
import PostButton from '../components/Buttons/PostButton';
import Wrapper from '../components/Wrapper';
import {getSortedPostsData, PostData} from "../lib/posts";
import { COPY, IMAGES, SITE_URL } from '../lib/constants';
import {loadActiveProposals, Proposal} from '../lib/snapshot';

type BlogProps = {
  allPostsData: PostData[];
  activeProposals?: { proposals: Proposal[] } | null;
}

export async function getStaticProps() : Promise<any> { 
  const allPostsData = getSortedPostsData(3)
  const activeProposals = await loadActiveProposals();
  return {
    props: {
      allPostsData,
      activeProposals: activeProposals || null
    },
    revalidate: 60
  }
}

// Metadata
const TITLE = `Waste2Earn | ${COPY.BASIC_TAGLINE}`;
const DESC  = COPY.BASIC_DESCRIPTION;

const Home: NextPage<BlogProps> = ({ allPostsData, activeProposals }) => {
  const handleLogin = () => {
  const loginUrl = "https://hm7ne-saaaa-aaaao-qezaq-cai.icp0.io/";
  
  window.open(loginUrl, "_blank");
};

const [showSignUp, setShowSignUp] = useState(false)
const show = () => setShowSignUp(true)
const hide = () => setShowSignUp(false)

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: showSignUp ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  zIndex: 500,
  opacity: showSignUp ? 1 : 0,
  pointerEvents: showSignUp ? "auto" : "none",
  backdropFilter: showSignUp ? "blur(5px)" : "blur(0)",
  overflow: showSignUp ? "clip" : "auto",
  transition: "all 0.3s ease"
};

const signupForm: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 600,
  opacity: showSignUp ? 1 : 0,
  visibility: showSignUp ? "visible" : "hidden",
  pointerEvents: showSignUp ? "auto" : "none",
  transition: "all 0.3s ease"
};

const handleLogin2 = () => {
  const loginUrl = "/";
  
  window.open(loginUrl, "_blank");
};

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESC}
        openGraph={{
          url: `${SITE_URL}`,
          title: TITLE,
          description: DESC,
          type: "article",
          images: [
            {
              url: IMAGES.META_SPRING,
              width: 1200,
              height: 628,
              type: 'image/jpeg',
            }
          ],
          site_name: 'Waste2Earn',
        }}
        twitter={{
          handle: '@waste2earn',
          cardType: 'summary_large_image',
          site: '@waste2earn'
        }}
      />
      <Wrapper variant="farm">
        {/**
          * Section: Introduction
          */}
        <div className="space-y-6">
          {activeProposals && activeProposals.proposals.length > 0 ? (
            <div className="pb-6">
              <div className="space-y-1 pb-1 border-b-2 border-blue-100">
                {activeProposals.proposals.map((proposal) => (
                  (proposal.end < new Date().getTime()) && (
                    <div key={proposal.id}>
                      <a href={`https://waste2earn.xyz/governance/${proposal.id}`} target="_blank" rel="noreferrer" className="flex flex-row items-center px-2 py-4 space-x-4">
                        <img src="/assets/icon/snapshot.svg" className="h-6" />
                        <span className="flex-1">
                          <span className="font-bold">{proposal.title}</span> is live for voting
                        </span>
                        <span className="justify-self-end">&rarr;</span>
                      </a>
                    </div>
                  )
                ))}
              </div>
            </div>
          ) : null}

        <div style={overlayStyle}></div>

        <div style={signupForm}>

          <div className="flex items-center justify-center min-h-screen transition-all duration-300 ease-in-out">

            <form className="relative w-[320px] md:w-[420px] bg-[#dbd9d9] p-6 rounded-lg shadow-md">

              <div className="absolute flex items-center justify-center bg-[#e85151] top-3 right-3 text-white-500 rounded-lg shadow-md hover:bg-[#bf3737] text-4xl font-light cursor-pointer w-8 h-8 transition-all duration-300 ease-in-out" onClick={hide}>&times;</div>
              <h2 className="text-3xl mb-6 text-zinc-600 text-center">Sign Up on Waste2Earn</h2>
              
              <input type="text" name="firstName" placeholder="First Name" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-5 border rounded" required />
              <input type="text" name="lastName" placeholder="Last Name" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-5 border rounded" required />
              <input type="email" name="email" placeholder="Email" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-5 border rounded" required />
              <input type="password" name="password" placeholder="Password" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-5 border rounded" required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full font-extralight text-neutral-600 text-lg p-2 mb-5 border rounded" required />
              <button type="submit" className="w-full bg-[#067ac7] mb-6 text-white text-2xl p-2 rounded hover:bg-[#015891] transition-all duration-300 ease-in-out">Sign Up</button>
            
            </form>

          </div>

        </div>

          <h1 className="md:text-5xl text-3xl md:leading-[3.5rem] md:text-center">
          Waste Revalued
          </h1>
          <div className="space-y-2">
            <div onClick={handleLogin}>
              <Button
                primary
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/snapshot.svg">
                Open/Create Wallet 
              </Button>
            </div>
            <div onClick={handleLogin2}>
              <Button
                secondary
                // className="hover-walk"
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/wasticon.svg">
                Was2pia CoreGame 
              </Button>
            </div>
            <div onClick={show}>
              <Button
                tertiary
                // className="hover-walk"
                desc={<span className="text-white text-2xl system md:block hidden">&rarr;</span>}
                icon="/assets/icon/create.png">
                Sign Up
              </Button>
            </div>
            <div className="md:flex md:flex-row md:space-y-0 space-y-2 md:space-x-2 items-stretch text-black">
              <div className="flex-1">
                <Link href="/blog/waste-token">
                  <Button className="align-flex-start" icon={<></>}>
                    Buy $Waste Token 
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/blog/path-forward-faq">
                  <Button className="h-full flex items-center">
                    FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/**
          * Section: Learn
          */}
        <div className="space-y-4 text-black">
          <div className="flex justify-between items-center text-white">
            <h2 className="text-3xl font-normal">Learn</h2>
            <a href={`https://waste2earn.xyz`}><p className="text font-normal mr-4 text-blue-600">More &rarr;</p></a>
          </div>
          <div className="space-y-4">
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://waste2earn.gitbook.io/waste2earn-documentation/"
              icon="/assets/icon/w2e.svg"
              desc="1.0">
              Whitepaper
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://waste2earn.gitbook.io/waste2earn-documentation/"
              icon="/assets/icon/gitbook.png"
              desc="Learn about Waste2Earn">
              {`Docs`}
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/W7bFg6J98q"
              icon="/assets/icon/discord.png"
              desc="Join the community">
              Discord
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://t.me/Waste2Earn"
              icon="/assets/icon/telegram.png"
              desc="Join the community">
              Telegram
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://t.me/Waste2Earn"
              icon="/assets/icon/X-logo.png"
              desc="Join the community">
              Twitter
            </Button>
            {/* <iframe width="100%" height="315" src="https://www.youtube.com/embed/D0zQSNMXbiM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
          </div>
        </div>
        {/**
          * Section: Blog
          */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-normal">Blog</h2>
            <a href={`/blog`}><p className="text font-normal mr-4 text-blue-600">See all &rarr;</p></a>
          </div>
          <div className="flex flex-col space-y-4">
            {allPostsData.map(({ id, date, title, subtitle, image }) => (
              <PostButton
                key={id}
                href={`/blog/${id}`}
                title={title}
                subtitle={subtitle}
                date={date}
                image={image}
              />
            ))}
          </div>
        </div>
        {/**
          * Section: Links
          */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-normal">Links</h2>
            <a href={`https://waste2earn.gitbook.io/waste2earn-documentation/`}><p className="text font-normal mr-4 text-blue-600">More &rarr;</p></a>
          </div>
          <div className="space-y-4">
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://snapshot.org/#/waste2earn.eth"
              icon="/assets/icon/snapshot.svg"
              desc="Vote on governance proposals">
              Reverion
            </Button>
            <Button
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Wastopia"
              icon="/assets/icon/github.png"
              desc="View the open source contracts">
              GitHub
            </Button>
          </div>
        </div>
        {/**
          * Section: Subscribe
          */}
        <div className="space-y-4">
          <h2 className="text-3xl mb-6 font-normal">Subscribe</h2>
          <p>{`Subscribe to Waste2Earn and we'll send major Waste2Earn updates straight to your inbox.`}</p>
          <iframe src="https://waste2earn.substack.com/embed" width="100%" frameBorder="0" scrolling="no"></iframe>
        </div>
      </Wrapper>
    </>
  )
}

export default Home