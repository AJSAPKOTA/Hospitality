# Ajay Sapkota — Chef Portfolio

A responsive, dynamic static portfolio designed for GitHub Pages.

## Structure

```text
Ajay-Sapkota-Chef-Portfolio/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── app.js
    └── images/
        ├── chef-portrait.jpg
        ├── herb-crusted-lamb-cutlets.jpg
        ├── ...
        └── strawberry-crepes.jpg
```

## Features

- Responsive mobile/tablet/desktop layout
- Sticky navigation with mobile menu
- Light/dark theme toggle
- Animated reveal effects
- Data-driven skills and food gallery
- Gallery category filtering
- Load-more interaction
- Full-screen image lightbox with keyboard navigation
- Accessible labels, focus states and alt text
- Local image assets only — no dependency on image-hosting services
- GitHub Pages compatible: plain HTML/CSS/JavaScript

## Image management

All portfolio images are intentionally normalised to `.jpg` and stored in:

`assets/images/`

When replacing the current dish artwork with your actual food photographs, keep the same filenames used by `assets/js/app.js`. Avoid spaces, ampersands, em dashes and mixed extensions in filenames.

## GitHub Pages

Upload the contents of this folder to the root of the `Hospitality` repository. The entry point is `index.html`.

The existing repository can then publish the project through GitHub Pages.
