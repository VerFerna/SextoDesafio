import handlebars from "express-handlebars";
import { isEmptyArray } from "../helpers/utils.js";

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    isEmptyArray: isEmptyArray,
  },
});

export default hbs;
