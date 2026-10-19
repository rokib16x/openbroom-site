# openbroom-site

The marketing site for [OpenBroom](https://github.com/rokib16x/openbroom), the honest Mac cleaner for developers.

Live at https://openbroom.rokib.dev

## Stack

- Next.js 16 (App Router) and React 19, TypeScript
- three.js for the 3D mark in the hero
- Plain CSS, no UI framework
- Plus Jakarta Sans (SIL OFL 1.1), notice in `public/assets/OFL-NOTICE.txt`

## Run it

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Notes

- App screenshots in `public/assets/shots` were captured from OpenBroom running against a fake home folder of demo projects, so no real paths appear.
- The "Press Scan" demo runs entirely in the browser on made-up data. It never touches your files.
- Brand tokens live in `app/tokens.css`; logos are in `public/assets/logo`.

## License

MIT, see `LICENSE`.
