export { default as Config } from "./Config/Config";
export {
    ConfigModel,
    Endpoint,
    EndpointData,
    EndpointDataBody,
    EndpointHeaders,
} from "./Config/schema";
export { default as Identity } from "./Identity/Identity";
export { default as Runner } from "./Runner/Runner";
export * from "./Template";

import Phisherman from "./Phisherman/Phisherman";
export default Phisherman;
