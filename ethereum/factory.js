import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x9027aa92Bd6314B9Dc8b265838b2179766D189E7"
);

export default instance;
