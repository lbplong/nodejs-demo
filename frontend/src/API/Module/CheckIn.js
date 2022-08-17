import AxiosPort from "../AxiosPort";

class CheckIn {
    checkIn = () => {
        const url = `/check-in`;
        return AxiosPort.get(url);
    }
}
export default new CheckIn();
