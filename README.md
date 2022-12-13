# Technologies

## Mantine - [@mantine/core](https://mantine.dev/)

I'm using mantine for a couple of different things. First and most important, mantine is a UI component library, so I'm using their form components and buttons to make the form a little bit nicer. Secondly, mantine also provides a light weight form library [@mantine/form](https://mantine.dev/form/use-form/) that I'll use to help me deal with form state and controlling the form fields. Lastly, mantine also has a notification library [@mantine/notifications](https://mantine.dev/others/notifications/). I can use these notifications for success messages when someone submits the form with correct data as well as error messages on the request if that ever happens.

## axios - [axios](https://axios-http.com/docs/intro)

I'm using axios to help with promises (I could have used the default fetch here, but axios is a bit more friendly)

## zod - [zod](https://zod.dev/)

I'm using zod to validate the form schema. Zod provides very nice helper functions in the schema to check for string lengths as well as email format. @mantine/form has a nice baked in resolver `zodResolver` that I can give the schema and it formats validation errors for me in the way that the form library would expect.

## react-query - [react-query](https://react-query-v3.tanstack.com/overview)

I'm using react-query specifically for their query cache and their hooks. This library provides a nice bridge between JavaScript's promise resolving and using the results in React functional components.

**_NOTE:_** What I could have done differently here if I weren't using react-query is use a useEffect to resolve the API request and have the useEffect act as a componentDidMount with an empty dependency array. This provides the same effect as the query cache with react-query, however the cache lets me not have to worry about React rerendering and is easy enough to plug into this application.

# Getting Started

In the project directory, you can run:
`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
