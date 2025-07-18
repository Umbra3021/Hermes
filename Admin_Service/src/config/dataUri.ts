import DataUriParser from "datauri/parser.js";
import path from 'path';

const getBuffer = (file: any) => {
    const parser = new DataUriParser();

    const ExtensionName = path.extname(file.originalname).toString();

    return parser.format(ExtensionName, file.buffer);
};

export default getBuffer;