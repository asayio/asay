function buildIndexHTML({ title, description, image, alt, url, host }) {
  return `<html lang="da">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:url" content="${url}">
      <meta property="og:image" content="${image}">
      <meta property="og:image:alt" content=${alt}>
      <meta property="og:type" content="website">
      <meta property="fb:app_id" content="211835762924678">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:image" content="${image}">
      <meta name="twitter:site" content="@initiativetdk">
      <meta name="twitter:creator" content="@initiativetdk" />
      <meta name="twitter:url" content="${url}/">
      <meta name="twitter:description" content="${description}">
      <meta name="twitter:title" content="${title}">
      <link rel="shortcut icon" href="${host}/favicon.png">
      <title>Initiativet</title>

      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="default">
      <meta name="apple-mobile-web-app-title" content="Initiativet">
      <link rel="apple-touch-icon" href="${host}/assets/icons/icon-120.png">
      <link rel="apple-touch-icon" sizes="152x152" href="${host}/assets/icons/icon-152.png">
      <link rel="apple-touch-icon" sizes="167x167" href="${host}/assets/icons/icon-167.png">
      <link rel="apple-touch-icon" sizes="180x180" href="${host}/assets/icons/icon-180.png">

      <link rel="icon" type="image/png" href="${host}/assets/icons/icon-64.png" sizes="64x64">
      <link rel="icon" type="image/png" href="${host}/assets/icons/icon-96.png" sizes="96x96">
      <link rel="icon" type="image/png" href="${host}/assets/icons/icon-128.png" sizes="128x128">
      <link rel="icon" type="image/png" href="${host}/assets/icons/icon-144.png" sizes="144x144">
      <link rel="icon" type="image/png" href="${host}/assets/icons/icon-192.png" sizes="192x192">

      <meta name="application-name" content="Initiativet">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" href="${host}/assets/icons/icon-144.png">
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root"></div>
    </body>
  </html>`;
}

module.exports = buildIndexHTML;
