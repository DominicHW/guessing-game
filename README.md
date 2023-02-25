# guessing-game
Simple full stack application which display an image of some Disney character with 4 answer options. 10 questions followed by a score page.

## Running Locally
Be sure to have all packages installed (in client/ and server/) by running `npm install`
`cd server && npm run dev`

The server/ acts as a web server when run, so it can serve the client without having to run it separately.

## Software Pattern & Tech
The application was developed using the REST software pattern, where the client and server code are separated into different directories. Since the application is small and only requires a couple of endpoints, creating a lightweight NodeJS/Express to handle requests from the NextJS client was the go-to choice as easy to configure and allows the UI to be "dumb", in that all it does is fetch, display and submit (and the express server can do the heavy lifting and any storage of data). The front end was developed with the newest versions of React/NextJS/Typescript. Implementing the solution with TS allows for better error handling as you can develop UI components with the knowledge that unknown data can't be passed down upon rendering (and also allows for easier testing since you are defining the types of objects that are being provided as props). The choice to go with NextJS over standard react lies in the ease of configuration, the quick build process and defining of pages (as well as nested API routing and the ability to have a connected custom JS server to serve and redirect requests to a given proxy). If the application were to be scaled up for whatever reason, NextJS offers the ability to deliver content to a user via SSR (although this isn't integrated currently in this project).

## Testing Plan
### Strategy
- Define standard use cases and user stories (as a, i want to, so that)
- Identify edge cases of input data for components data
- Define acceptance tests (given/when/then), derived from user stories
- Define scope of components and pages that need to be unit tested (in this case - all individual React components that can be independently rendered)
- Define API unit tests
- Define integration tests (between questions > results page and vice versa).


### Environment/Tech
Unit testing - Vitest with React-Testing-Library (rapid with minimal configuration)

## Improvements
Given more time, there are a few features that I would aim to integrate to improve the user experience overall, as well as increase the effciciency of the applciation. 
- Logic to analyse the fetched image and process whether it exists. Some images come up as blank (empty images that are no longer hosted)
- Integrate sessions - as it stands, sessions aren't integrated for different users
- Persisting questions on reload - for the purpose of demonstrating the variety of answers and images, the question changes when you reload the page (but doesn't reset which round you're on).
- Add user feedback to signify correct and incorrect answers - such as a delay with a green success or red failure banner before moving to the next question
- UI/design tweaks
- Move server logic from /server into the NextJS custom server