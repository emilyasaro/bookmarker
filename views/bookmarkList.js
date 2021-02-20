const html = require("html-template-tag");
module.exports = (bookmarks) => html`
  <html>
    <head></head>
    <body>
      <h1>${bookmarks[0].category.title}</h1>
      <div id="bookmarkList">
        ${bookmarks.map((bookmark) => html` <div>${bookmark.name}</div> `)}
      </div>
    </body>
  </html>
`;
