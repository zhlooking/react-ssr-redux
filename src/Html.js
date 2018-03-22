// HTML template file
// Return a template string from this function
import serialize from 'serialize-javascript';

const Html = ({ body, styles, title, initialState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>  
        <link rel="stylesheet" href="/css/main.css">
        ${styles}
        <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
      </head> 
      <body style="margin:0">
        <div id="app">${body}</div>
      </body>
    </html>
  `
};

export default Html
