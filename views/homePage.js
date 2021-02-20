const html = require("html-template-tag");
module.exports = (categories) => html`
  <html>
    <head></head>
    <body>
      <h1>Bookmarks</h1>
      <form method="POST" action="/bookmarks">
        <input name="siteName" placeholder="Site Name" />
        <input name="url" placeholder="Site URL" />
        <label for="category">Choose a category</label>
        <select id="categories" name="categories">
          ${categories.map(
            (category) =>
              html` <option value="${category.id}">
                ${category.title}
              </option>`
          )}
        </select>
        <button type="submit">Save</button>
      </form>
      <div id="homepage">
        ${categories.map((category) => html` <div>${category.title}</div> `)}
      </div>
    </body>
  </html>
`;
