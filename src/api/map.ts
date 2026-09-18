import request from "@/utils/request";

const tdtTk = import.meta.env.VITE_TIANDITU_TK

export function getLonlat(keyWord: string) {
  return request({
    url: "/search",
    method: "get",
    params: {
      postStr: {
        keyWord,
        tk: tdtTk
      },
    },
  });
}
