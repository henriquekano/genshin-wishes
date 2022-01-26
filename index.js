import { getConfigList, getGachaLog } from "./genshin-api.js";
import fs from "fs";

const main = async () => {
  const credentials = fs.readFileSync("./.CREDENTIALS", "utf8");
  let [, , authKey] = process.argv;
  authKey = authKey || credentials;
  const fetchAllBannerItems = async ({ bannerType }) => {
    let didntFetchAll = true;
    let list = [];

    let page = 1;
    let endId = 0;
    do {
      const {
        body: {
          data: { list: nextList },
        },
      } = await getGachaLog({
        authKey,
        gachaType: bannerType,
        page,
        size: 6,
        endId,
      });
      list = [...list, ...nextList];

      page++;
      endId = list[list.length - 1] ? list[list.length - 1].id : 0;
      didntFetchAll = nextList.length > 0;
    } while (didntFetchAll);

    return list;
  };

  const {
    body: {
      data: { gacha_type_list: banners },
    },
  } = await getConfigList({ authKey });

  if (!fs.existsSync("wishes")) {
    fs.mkdirSync("wishes");
  }
  for (const banner of banners) {
    const page = await fetchAllBannerItems({
      bannerType: banner.key,
    });
    console.log(banner.name, page.length);
    fs.writeFile(`./wishes/${banner.name}.json`, JSON.stringify(page), () => {
      console.log(`${banner.name} done`);
    });
  }
};

main();
