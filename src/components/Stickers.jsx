import { useEffect, useState } from "react";

function isStringWhitespace(str) {
    return (!str.replace(/\s/g, '').length);
}

function Stickers(props) {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        async function updateImageUrls() {
            const queryUrl = isStringWhitespace(props.query) ? 'https://us-east-1-bitmoji.api.snapchat.com/direct/pack/popular' : `https://us-east-1-bitmoji.api.snapchat.com/direct/search?q=${props.query}`;
            const res = await fetch(queryUrl, {
                'method': 'GET',
                'headers': {
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.7',
                    'bitmoji-token': props.token,
                    'Referer': 'https://www.bitmoji.com/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
                },
            });
    
            const jsonRes = await res.json();
    
            if (jsonRes.statusCode == 401) return;

            const newImageUrls = [];

            for (const image of jsonRes.data) {
                let url = image.uri;
                url = url.replace('&size=thumbnail', '');
                newImageUrls.push(url);
            }

            setImageUrls(newImageUrls);
        }

        updateImageUrls();
    }, [props.query]);

    async function onImageClick(e) {
        const url = e.target.currentSrc;

        const res = await fetch(url);
        const blob = await res.blob();
    
        await navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob,
            }),
        ]);

        props.onNotificationCopied();
    }

    return (
        <div className="flex flex-wrap w-full mt-11">
            {imageUrls.map((url) => {
                return (
                    <img key={url} className="m-2 cursor-pointer" src={url} alt="Sticker" width={100} height={100} onClick={onImageClick}></img>
                )
            })}
        </div>
    )
}

export default Stickers;