import {
    Schema,
    model
} from 'mongoose';

const urlSchema = new Schema({
    origin: String,
    code: String,
    url: String,
}, {
    timestamp: true
});

let url = model('url', urlSchema);
export default url;