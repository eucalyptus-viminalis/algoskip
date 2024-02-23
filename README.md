# algoskip

\> _extensible diy feed algos in a frame_

\> _skip the algorithm_

---

__Table of Contents__

1. [Demo](#demo)
2. [Overview](#overview)
3. [Motivation](#motivation)
4. [Workflows](#workflows)
5. [Get Started](#get-started)
6. [Contributors](#contributors)

## Demo

Live on warpcast: https://warpcast.com/3070/0xe5770891

> Developers: To learn how to run the app, please skip to [Get Started](#get-started)

Interact with _algoskip_ using _Warpcast_'s frame validator tool with the below details:

- frame validator tool: https://warpcast.com/~/developers/frames
- _algoskip_ deployment url (initial frame): https://algoskip.vercel.app/frame/home

1. Go to the frame validator tool using the link above
2. Copy and paste the deployment url above for the initial frame
3. Click the button to the right of where you pasted the URL
4. Interact with _algoskip_

<img width="570" alt="image" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/9d1884b6-e345-45b3-a4ca-23d7e1d9564a">


## Overview

_algoskip_ is a _Farcaster Frame_ implementation of a _Farcaster_ feed. It serves _Farcaster_ casts via filters and algorithms that the user selects, bypassing the hard-coded algorithm set by the client in which the user is viewing the frame, or injecting casts into any environment that supports _Farcaster Frame_ embeds.

## Motivation

One of the most valuable aspects of decentralized protocols, such as _Farcaster_, is the **public accessibility** of data. _algoskip_ serves to highlight the notion of composability afforded by such protocols, through accessing public data and allowing users to "skip the algorithm" via the _Farcaster Frame_ technology.

## Workflows

1. Composing Criterias
2. Browsing Selected Casts

### Composing Criterias

Users are able to compose criterias to retrieve desired casts.

This workflow involves:

1. **Selecting** the category of casts: "my casts" or "trending"
2. **Applying** filters and **Selecting** a sorting algorithm
3. If "trending" selected: Also **Selecting** a channel to filter by
4. **Performing** a "reveal" in which a selection of casts are retrieved by _algoskip_ and served to the user

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/1bc78bbe-6635-4510-a24c-31d6a2cee2ac">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/c022f6e3-4d0c-43df-8781-059637715d3b">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/f0ca10a1-c4c0-4274-a117-5746425c7f89">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/d2cb079e-282b-4d1e-b0e4-740166305a0c">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/a7fd2265-e151-42f5-99ac-e5758165c945">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/4d712746-fa11-46da-907e-17e9a38a5e28">

### Browsing Selected Casts

Users can browse the "revealed" casts via _Farcaster Frame_ buttons.

This workflow involves:

1. **Navigating** the selection of casts "revealed" by the criterias set by the user
2. **Viewing** a cast with context by pressing the "goto cast" button and navigating to a _Farcaster_client, such as _Warpcast_

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/ac88cbef-6362-4afd-9c5f-c9ee04b0ee71">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/24a0b532-17d7-4cea-884e-687e4f540922">

<img width="600" src="https://github.com/eucalyptus-viminalis/algoskip/assets/65995595/36f6ea41-92e0-4250-87bd-3db7c462f46b">

## Get Started

> You must have your own _Neynar_ api key to run this app. If you don't have one, please head over to https://neynar.com/ before following the below steps

1. Clone the repo through _GitHub_: https://github.com/eucalyptus-viminalis
2. Make a copy of `.env.example` file and name it `.env.local`
3. Set `NEYNAR_API_KEY` environment variable in `.env.local`
4. Run `pnpm install` or `npm install` at the command line to install the project's dependencies
5. Run `pnpm dev` or `npm dev` to run the app
6. Test frame routes located at `/src/api/*` using HTTP clients like _Postman_ **or** deploy the app to a platform like _Vercel_ and use the deployment URL to interact with the frame using _Warpcast_'s frame validator tool (https://warpcast.com/~/developers/frames)

## Contributors

- 3070 ([Warpcast Profile](https://warpcast.com/3070))
