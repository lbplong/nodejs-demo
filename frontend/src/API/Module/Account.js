import AxiosPort from "./../AxiosPort";

class Account {
  login = (data) => {
    const url = "/login";
    return AxiosPort.post(url, data);
  };

  register = (data) => {
    const url = "/register";
    return AxiosPort.post(url, data);
  };
}

export default new Account();
