# Secure Profile App

## Student Information

**Name:** JADE OLACAO
**Section:** CCE106

## Description

Secure Profile is an Expo React Native application that demonstrates API authentication and secure access-token handling. The app uses DummyJSON for authentication and retrieves a protected user profile after login.

## Features

* User login using DummyJSON API
* Secure access-token storage using Expo SecureStore
* Protected profile request using a Bearer token
* Session restoration after app reload
* Logout and token deletion
* Login error handling
* Loading and authenticated states

## Installation

Install the project dependencies:

```bash
npm install
```

Install Expo SecureStore:

```bash
npx expo install expo-secure-store
```

## Run

Start the Expo development server:

```bash
npx expo start
```

Open the application on an Android or iOS device.

## Test Account

This project uses the public DummyJSON practice account provided for the laboratory:

**Username:** emilys
**Password:** emilyspass

## Security

The access token is stored using Expo SecureStore. The token is not hard-coded or displayed in the application or console. Protected API requests send the token using the Authorization Bearer scheme. The stored token is deleted when the user logs out.

## API

The application uses the DummyJSON authentication API for practice purposes.
