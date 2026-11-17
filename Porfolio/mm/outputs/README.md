# Jayve Valero — personal portfolio

A responsive one-page portfolio built with semantic HTML, CSS, and vanilla JavaScript. It has no build step and no third-party libraries.

## Open it locally

1. Open the outputs folder in Visual Studio Code.
2. Open index.html in a browser. You can also use the Live Server extension for automatic refresh while editing.
3. The page works as static files; there is no package install or local server requirement.

## Folder contents

- index.html — page content and section structure.
- style.css — colors, layout, responsive styles, and motion.
- script.js — editable profile data and interactions.
- assets/ — optional photos, project screenshots, and other media. The current design uses CSS artwork, so images are not required.

## Personalize it

### Profile, skills, and project cards

Open script.js and edit the content near the top:

- PROFILE.links — add your real GitHub, LinkedIn, email, Facebook, or other profile details. Leave unknown or unused values blank; empty links stay hidden.
- skillAreas — adjust the learning topics and labels as you gain experience. Add specific languages, editors, or engines only once you have actually used them or are learning them.
- projects — update project descriptions, technologies, features, status, and links. The portfolio site is marked Built; the other sample cards are clearly marked Idea.
- goals — change the short- and long-term roadmap text.

The name, headings, biography, motto, and footer are in index.html. Search for “Jayve” or the text you want to change. The title, country, and current interests are plain HTML, so they are beginner-friendly to edit.

### Gaming collection and profile

Use the Add a game button on the page to add a game you actually play or enjoy. You can search, filter by genre, and remove entries. The collection and the optional gaming profile are saved in the current browser using local storage. They are not uploaded to a server.

To reset browser-saved collection, gaming profile, and roadmap progress, open the browser developer console on this page and run:

<pre>
localStorage.removeItem("jayvePortfolioGames");
localStorage.removeItem("jayvePortfolioProfile");
localStorage.removeItem("jayvePortfolioGoals");
</pre>

### Contact form

The contact form validates the fields in the browser. It does not send messages until you configure a real form provider. Add the HTTPS endpoint supplied by that provider to PROFILE.formEndpoint near the top of script.js. Do not put private API keys in front-end files. Test with the provider's own instructions before publishing.

### Images and projects

Put your own images in assets/. If you want to show a real screenshot, add an image inside that project's artwork in index.html and update style.css so it crops well on mobile. The current CSS illustrations work as image-free fallbacks.

## Publish with GitHub Pages

1. Create a GitHub repository for the site and add the contents of this outputs folder to its root.
2. In the repository, open Settings → Pages.
3. Choose Deploy from a branch, choose your publishing branch and the root folder, then save.
4. Open the Pages URL GitHub provides after deployment. Check the site on a phone-sized screen and click the navigation, game collection, project details, and roadmap.
5. Relative file references (style.css, script.js, and assets/) will continue to work at a GitHub Pages project URL.

## Accessibility and behavior

The site has semantic landmarks, a skip link, keyboard focus styles, accessible labels, keyboard-operable controls, a mobile menu with Escape support, reduced-motion handling, a live Philippine Time clock, and a form that explains when sending is not configured. Game and profile entries and roadmap checkmarks are stored locally in the browser.
