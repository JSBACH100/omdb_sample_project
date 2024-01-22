# Getting Started with Create Next App

This project was initialized with [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. First create a `.env.local` file in the project's root folder. Obtain your API key [here]() and add to the file with the variable name `NEXT_PUBLIC_OMDB_KEY`.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Creates a minified/optimized production build.

### `npm run start`

Will locally run the production code located in the `build` folder after running the build script.

## Testing SSR

View only the content that is being server side rendered by disabled javascript in chrome dev tools. Instructions [here](https://developer.chrome.com/docs/devtools/javascript/disable).

## Live app

View the live version deployed using Verel's CI/CD flow [here](https://omdb-sample-project.vercel.app/)