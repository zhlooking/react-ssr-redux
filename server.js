import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import routes from './src/routes';
import App from './src/App';
import Html from './src/Html';
import configureStore from './src/configureStore';

const port = 3000;
const server = express();

server.use(express.static('dist/assets'))

server.get('*', (req, res, next) => {
  const store = configureStore();

  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {}
      const body = ReactDomServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );
      const initialState = store.getState()
      const sheet = new ServerStyleSheet();
      const styles = sheet.getStyleTags();
      const title = 'Server Side Rendering with Styled Components';

      res.send(
        Html({
          body,
          styles,
          title,
          initialState
        })
      );
    })
    .catch(next);
});

server.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
