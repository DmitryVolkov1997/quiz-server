import axios from "axios";

export default axios.create({
    baseURL:  "https://react-quize-1ad48-default-rtdb.firebaseio.com/"
})