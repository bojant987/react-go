# React Go

Simple React boilerplate to start you up.

Includes:
* redux, redux-thunk, react-router
* simple express server to serve project
* webpack config for dev and prod
* Jest for testing
* modified airbnb eslint for linting, which you can easily remove/edit if you don't like it
* prettier config, which you can alter to your liking
* Husky precommit hooks for running unit tests and prettier
* setup that makes it very easy to deploy to something like Heroku.
* some dummy components and one very important test case

## Installation
Install using npm or yarn, ie:

```sh
npm install
```

## Scripts

To run project in dev env with webpack-dev-server and source maps, run:
```sh
npm run dev
```

To run project in prod env with express server and minification of resources, run:
```sh
npm start
```

## Redux ajax adapter
Simple function that wraps axios API calls and takes action creators to dispatch on call request, success or error.
This can be extended with custom auth stuff, like headers, so you don't have to specify them with every API call you make.
You can use it or delete it.


