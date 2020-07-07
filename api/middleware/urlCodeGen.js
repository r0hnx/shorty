import shortid from "shortid"

const shortCode = {
  generate: () => {
    return shortid.generate();
  }
}

export default shortCode;