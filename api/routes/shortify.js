import express from 'express';
import validUrl from 'valid-url';
import shortCode from '../middleware/urlCodeGen';

const router = express.Router();
import url from '../model/url';

router.get("/item/:code", async (req, res) => {
    const code = req.params.code;
    const item = url.findOne({ code });
    if(item) res.redirect(item.origin);
    else return res.status(404).json('Invalid Code Fromat');
});

router.post("/item", async (req, res) => {
    const { baseUrl, originalUrl } = req.body;
    const query = { origin : originalUrl };
    if(!validUrl.isUri(baseUrl)) return res.status(404).json('Invalid Base Url Format');
    if(validUrl.isUri(orginalUrl))
    {
        let urlData;
        try {
            urlData = await cache.getFromCache('origin', JSON.stringify(query));
            if(!urlData) urlData = await url.findOne(query).exec();
            if(urlData) res.status(200).json(urlData);
            else {
                const code = shortCode.generate();
                let shortUrl = `${baseUrl}/${code}`;
                const wrapper = {
                    origin,
                    url: shortUrl,
                    code
                }
                const item = url(wrapper);
                await item.save();
                cache.addToCache('origin', JSON.stringify(query), wrapper);
                res.status(200).json(wrapper);
            }
        } catch (error) {
            res.status(401).json(error);
        }        
    } else {
        return res.status(401).json({message: "Invalid URL"})
    }
});

export default router;