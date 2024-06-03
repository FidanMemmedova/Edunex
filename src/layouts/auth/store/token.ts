import Cookies from "js-cookie";

type Tokens = {
  access: string;
  refresh?: string;
};

export function useToken() {
  //
  //
  //
  const setToken = (tokens: Tokens) => {
    Cookies.set("edunex-token", tokens.access);
  };
  //
  //
  //
  const getToken = () => {
    return Cookies.get("edunex-token");
  };

  const deleteToken = () => {
    try {
      Cookies.remove("edunex-token");
    } catch (error) {
      console.log(error);
    }
  };

  return { setToken, getToken, deleteToken };
}
