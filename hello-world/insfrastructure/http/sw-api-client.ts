import Axios from "axios";

const swApiclient = Axios.create({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    headers: {
        "Content-Type": "application/json",
    },
    //baseURL: 'https://api.github.com',
  });

  export default swApiclient;