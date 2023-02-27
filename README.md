# Ethereum Block Explorer - playing with Alchemy SDK

This is a React web application built as a part of the **[Alchemy Ethereum Bootcamp](https://docs.alchemy.com/reference/api-overview)** to learn about JSON-RPC and interact with the Ethereum blockchain using the Alchemy SDK. The application consists of three main pages: a Block Table page that displays information about the latest Ethereum block and the previous 9 blocks, a Balance Checker page that allows the user to see their balance in ETH, and an NFTs Checker page that allows the user to see a list of their NFTs.

## **Building the App**

The application is built using React and React Router. It utilizes the Alchemy SDK to fetch data from the Ethereum blockchain. Tailwind is also used to style the app. To build and run the app, follow these steps:

1. Install the required dependencies using **`npm install`**.
2. Add your Alchemy API key to a **`.env`** file in the root of the project.
3. Start the development server using **`npm start`**.

## **Pages**

### **Balance Checker**

This page allows the user to enter an Ethereum address and see their balance in ETH. The balance is retrieved using the Alchemy SDK. A loading spinner is displayed while the balance is being retrieved.

### **NFTs Checker**

This page allows the user to enter an Ethereum address and see a list of their NFTs. The NFTs are retrieved using the Alchemy SDK. A loading spinner is displayed while the NFTs are being retrieved.

### **Block Table**

This page displays information about the latest Ethereum block and the previous 9 blocks. The block data is retrieved using the Alchemy SDK. A loading spinner is displayed while the data is being retrieved. The page displays the block number, timestamp, number of transactions, miner address, and gas used for each block. It also displays a message indicating whether the gas price for the next block is expected to increase or decrease.

## **Components**

### **Navbar**

This component displays a navigation bar at the top of the page. It contains links to the three main pages of the app.

### **PrevBlockRow**

This component is used by the Block Table page to display information about a single previous block. It takes the block number, timestamp, number of transactions, miner address, and gas used as props and displays them in a table row.

## **Dependencies**

This app uses the following dependencies:

- React: A JavaScript library for building user interfaces.
- React Router: A routing library for React.
- Alchemy SDK: A JavaScript library for interacting with the Ethereum blockchain.
- Tailwind: A utility-first CSS framework for rapid UI development.
- react-loading-spin: A React component for displaying a loading spinner.

## **To Go Further**

The Alchemy SDK provides a vast array of APIs and methods that can be used to interact with the Ethereum blockchain. The application presented in this repository only scratches the surface of what is possible with Alchemy SDK. If you want to continue exploring the capabilities of the Alchemy SDK, take a look at the **[Alchemy documentation](https://docs.alchemy.com/reference/api-overview)**. Here, you will find a wealth of information about the available APIs, including Core Methods, NFT Methods, Notify methods, and more. Happy exploring!
