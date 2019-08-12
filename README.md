# CodiMD Downloader Bookmarklet
Bookmarklets to download all notes or single note on CodiMD/HackMD.

## Description
### `download-all-pages.bookmarklet.js`
- Download all CodiMD notes stored in your history page.
- Download uploaded images linked to downloaded note.
- Compress files to zip.
- Generate a list of downloaded notes and save to README.md.

### `download-single-page.bookmarklet.js`
- Download the CodiMD note opened in your web browser now.
- Download uploaded images linked to the note.
- Compress files to zip.

## VS. Other Tools
The first time I searched note downloading tools, I found [hbdoy/hackmd_download](https://github.com/hbdoy/hackmd_download) which is a 3rd-party bookmarklet to download all notes.

After that, [CodiMD](https://github.com/hackmdio/codimd/) v1.2.0 officially supported the note export function.

- [issue](https://github.com/hackmdio/codimd/issues/823)
- [pull request](https://github.com/hackmdio/codimd/pull/830)
- [source code](https://github.com/hackmdio/codimd/pull/830/commits/bcbb8c67c9f8092643c318140f6613324f306bd2)

Both of those have a problem that they cannot download the image files uploaded on the notes.

`CodiMD Downloader Bookmarklet` solves it.

## Licence
[MIT](LICENCE)

## Author
[j3iiifn](https://github.com/j3iiifn)
