import shortid from "shortid"
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const shortCode = {
  generate: () => {
    return shortid.generate();
  }
}

export default shortCode;