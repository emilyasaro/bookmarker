const html = require("html-template-tag");
module.exports = (categories) => html`
  <html>
    <head></head>
    <body>
      <h1>Bookmarks</h1>
      <div id="homepage">
        ${categories.map((category) => html` <div>${category.title}</div> `)}
      </div>
    </body>
  </html>
`;
