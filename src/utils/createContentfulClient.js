import * as contentful from 'contentful'

/*export const contentfulClient = contentful.createClient({
    space: 'x49uwc6zcn1n',
    accessToken: 'kLdx2zo2rk1Ls3bH_IPaOvRN1q4RpWPmxlWCQt14CIY',
});*/


export const contentfulClient = contentful.createClient({
    space: import.meta.env.VITE_SPACE_ID,
    accessToken: import.meta.env.VITE_ACCESS_TOKEN,
  });
  