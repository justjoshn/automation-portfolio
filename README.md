# React Shopping Cart with Cypress and Playwright Automation

## Overview

This repository showcases my expertise in web application automation testing, focusing on a React-based shopping cart application. Initially cloned from an existing project, I've enhanced the application by adding `data-cy` attributes to facilitate testing and implementing comprehensive test suites using both Cypress and Playwright frameworks with TypeScript.

### Key Features

- **Enhanced React Application**: Added `data-cy` attributes to improve testability.
- **Cypress Automation**: Extensive Cypress test cases using TypeScript and Page Object Model.
- **Playwright Automation**: Comprehensive Playwright test suite, also utilizing TypeScript and Page Object Model.

### Original Application Credit

This project is built upon the React Shopping Cart application originally created by [Jefferson Ribeiro](https://github.com/jeffersonRibeiro). The original repository can be found here: [jeffersonRibeiro/react-shopping-cart](https://github.com/jeffersonRibeiro/react-shopping-cart). I would like to express my gratitude to Jefferson Ribeiro for developing the initial application, which served as a foundation for my automation work.

## Getting Started

### Prerequisites

- Node.js
- NPM
- Chromium Browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/justjoshn/automation-portfolio.git
   ```
2. (If using Linux) Install Cypress prerequisites:
   ```bash
   apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
3. Install the Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Start the React application:
   ```bash
   npm start
   ```

## Running the Tests

### Cypress Tests

Run Cypress tests using the following commands:

- To open Cypress Test Runner:
  ```bash
  npm run cypress:open
  ```
- To run Cypress tests headlessly:
  ```bash
  npm run cypress:run
  ```

### Playwright Tests

Execute Playwright tests using:

- To open Playwright Test Runner:
  ```bash
  npm run playwright:open
  ```
- To run Playwright tests on Chromium:
  ```bash
  npm run playwright:run
  ```

### Copyright and license

The MIT License (MIT). Please see License File for more information.
