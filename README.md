# Wallet Abstraction Demo

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Mobey-eth/Account-Abstraction/blob/main/LICENSE)

## Overview

This repository provides a solution for account abstraction, allowing users to create an EOA (Externally Owned Account) wallet with just a username and password. Users can also mint a Mobi: Whale Collection NFT on the Polygon Mumbai Testnet using this platform.

### Features

- Create an EOA wallet with a username and password.
- Mint Mobi: Whale Collection NFTs on the Polygon Mumbai Testnet.

## Usage

To get started, simply follow these steps:

1. Visit the project demo website [Here](https://mobi-wallet-abstraction.vercel.app/).

2. Sign up with a username and password.

3. Once logged in, you can claim your free and gasless Mobi: Whale Collection NFT.

Please note that the usage of this project is primarily web-based, and there's no current implementation of account recovery so please **DO not send real funds to the Wallet** as this is for testing purposes only.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to contact us through [E-mail](chantler.aob@gmail.com).

Enjoy exploring and claiming your NFT!

## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template next-typescript-starter
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

## Environment Variables

To run this project, you will need to add environment variables. Check the `.env.example` file for all the environment variables required and add it to `.env.local` file or set them up on your hosting provider.

## Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy