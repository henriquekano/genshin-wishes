import fetch from "node-fetch";

const endpoint = "https://hk4e-api-os.mihoyo.com/event/gacha_info/api";

/**
 *
 * @param {*} param0
 * @returns {
 *  retcode: number,
 *  message: string,
 *  data: {
 *      page: string,
 *      size: string,
 *      total: string,
 *      list: {
 *          "uid": "623857910",
 *           "gacha_type": "400",
 *           "item_id": "",
 *           "count": "1",
 *           "time": "2022-01-25 18:21:22",
 *           "name": "Ganyu",
 *           "lang": "en-us",
 *           "item_type": "Character",
 *           "rank_type": "5",
 *           "id": "1643151960014738310"
 *      }
 *  }
 * }
 */
const getGachaLog = async ({
  authKey,
  gachaType,
  endId = 0,
  page = 1,
  size = 6,
}) => {
  const response = await fetch(
    `${endpoint}/getGachaLog?authkey=${authKey}&` +
      new URLSearchParams({
        authkey_ver: 1,
        lang: "en",
        gacha_type: gachaType,
        page,
        size,
        end_id: endId,
      }).toString()
  );

  return {
    status: response.status,
    body: await response.json(),
  };
};

/**
 *
 * @param {*} param0
 * @returns {
 *  retcode: number,
 *  message: string,
 *  data: {
 *      gacha_type_list: [{
 *          id: string,
 *          key: string,
 *          name: string
 *      }]
 *  }
 * }
 */
const getConfigList = async ({ authKey }) => {
  const url = `${endpoint}/getConfigList?authkey=${authKey}&authkey_ver=1&lang=en`;
  const response = await fetch(url);

  return {
    status: response.status,
    body: await response.json(),
  };
};

export { getGachaLog, getConfigList };
