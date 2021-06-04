# Cryptogether

License: MIT

Contributors:

- Daniel Dupriest
- Nhan Le
- Robin Gearn

Cryptogether is a cryptocurrency dashboard application written in TypeScript, powered by React, and data provided by the CoinGecko API. Features include list of trending coins, detailed coin list, description page for each coin with candlestick price chart, list of cryptocurrency exchanges, and a description page providing detailed information for each exchange.

## Running development server

Ensure that node and npm are up to date.

1. clone the repository and change to the root directory
2. run `npm install`
3. run `npm start`

## Building and Deployment

The following steps are specific to serving from a web server running Apache2.

1. Navigate to the project root directory.
2. Run `npm run build`.
3. Copy the contents of `/build` into the directory from which you wish to serve.

### Serving from a subdirectory

If you will be serving the application from a subdirectory, there are a couple things that need to be configured.

1. Open `App.tsx` and modify the `<BrowserRouter>` element to include the prop `basename="/subdirectory/"`.
2. Open `package.json` and add (or modify) the line `"homepage": "http://yourserver.com/subdirectory"` to reflect your installation.

### Allowing direct linking and bookmarks

In order to link directly to a subpage of the app, a url rewriting directive is necessary.

1. Create an `.htaccess` file in the directory from which the application will be served and include the following contents:

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### Content Security Policy

When deploying to a web server, it may be necessary to configure the server to provide a Content Security Policy header for the application to work in certain browsers.

1. Create an `.htaccess` file in the root directory of the application.
2. Include the following content.

```
Header set Content-Security-Policy "default-src 'self';script-src 'self' 'un    safe-inline' 'unsafe-eval';style-src 'self' 'unsafe-inline';img-src * 'self' https://* data:;connect-src 'self' https://api.coingecko.com;"
```

Note that this configuration may be overly permissive, and care should be taken when deploying to a production server.
