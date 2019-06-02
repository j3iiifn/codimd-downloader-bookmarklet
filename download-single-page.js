(async () => {
    const two = n => {
        return (n < 10 ? '0' : '') + n;
    };
    const unixtime2str = (unixtime, format_str) => {
        const d = new Date(unixtime);
        const year = d.getFullYear();
        const month = two(d.getMonth() + 1);
        const date = two(d.getDate());
        const hour = two(d.getHours());
        const minute = two(d.getMinutes());
        const second = two(d.getSeconds());
        return format_str.replace(/YYYY/g, year).replace(/mm/g, month).replace(/dd/g, date).replace(/HH/g, hour).replace(/MM/g, minute).replace(/SS/g, second);
    };
    const sleep = ms => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    };

    const external_scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"
    ];

    await Promise.all(external_scripts.map(url => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.async = true;
            script.type = 'text/javascript';
            script.src = url;
            script.onload = resolve(url);
            script.onerror = reject(url);
            document.body.appendChild(script);
        });
    }));

    await sleep(1000);
    const zip = new JSZip();
    const zip_uploads = zip.folder("uploads");

    const now = new Date();
    const page_id = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];
    const filename_zip = `${window.location.host}_${page_id}_${unixtime2str(now, 'YYYYmmdd_HHMMSS')}.zip`;

    const response_md = await fetch(`${page_id}/download`);
    const raw_md = await response_md.text();

    // extract uploaded images
    const regex_img = /!\[.*?\]\((.*?)\)/g;
    while ((match_img = regex_img.exec(raw_md)) !== null) {
        const url_img = match_img[1];
        if (!url_img.startsWith('/') && !url_img.startsWith(`${window.location.protocol}//${window.location.host}/uploads/`)) {
            // not uploaded file
            continue;
        }
        const response_img = await fetch(url_img);
        const blob_img = await response_img.blob();
        const filename_img = url_img.substring(url_img.lastIndexOf('/') + 1);
        zip_uploads.file(filename_img, blob_img, {
            binary: true
        });
        console.log(`download image: ${url_img} --> ${filename_img}`);
    }

    // replace uploaded image URLs to relative paths
    const img_replace_regex = new RegExp(`${window.location.protocol}\/\/${window.location.host}\/uploads\/`, 'g');
    const replaced_raw_md = raw_md.replace(img_replace_regex, 'uploads/');

    const filename_md = `${page_id}.md`;
    zip.file(filename_md, replaced_raw_md);
    console.log(`download markdown: ${page_id} --> ${filename_md}`);

    const content = await zip.generateAsync({
        type: "blob"
    });
    saveAs(content, filename_zip);
})();
