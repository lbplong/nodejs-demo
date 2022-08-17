import AxiosPort from "./../AxiosPort";

class Movie {
  getData = (data) => {
    const { page, itemsPerPage } = data;
    const url = `/movies?page=${page}&itemsPerPage=${itemsPerPage}`;
    return AxiosPort.get(url);
  };
  changeLikedMovie = (data) => {
    const url = `/movies/like`;
    return AxiosPort.post(url, data);
  };
}

export default new Movie();
