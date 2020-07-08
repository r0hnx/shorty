import express from 'express';
import validUrl from 'valid-url';
import shortCode from '../middleware/urlCodeGen';
import cache from '../service/cache';
const Url = require("../model/url").default;
const router = express.Router();

router.get("/item/:code", async (req, res) => {
    const code = req.params.code;
    const item = Url.findOne({ code });    
    if(item) res.send(item.origin);
    else return res.status(404).json('Invalid Code Format');
});

router.post("/item", async (req, res) => {
    const { baseUrl, origin } = req.body;
    const query = { origin };
    if(!validUrl.isUri(baseUrl)) return res.status(404).json('Invalid Base Url Format');    
    if(validUrl.isUri(origin))
    {
        let urlData;
        try {
            urlData = await cache.getFromCache('origin', JSON.stringify(query));
            // if(!urlData) {
            //     urlData = await Url.findOne(query).exec();
            // }
            if(urlData) {
                res.status(200).json(urlData);
            } else {
                const code = shortCode.generate();
                let url = `${baseUrl}/${code}`;
                const wrapper = {
                    origin,
                    url,
                    code
                }
                const item = Url(wrapper);
                await item.save();
                cache.addToCache('origin', JSON.stringify(query), wrapper);
                res.status(200).json(wrapper);
            }
        } catch (error) {
            res.status(401).json("Error Catched");
        }        
    } else {
        return res.status(401).json("Invalid URL");
    }
});

export default router;