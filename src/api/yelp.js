import axios from "axios";

export default axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization: "Bearer of2gZE6UFnShTnmw7I3mI9q6jnHyP0nKZy8khqq8aH7dJDSeg9AmybOYtHzTJLtStuePOTTidKiOcEcwua8oL3LVHcNp4rGHfFwfbipLkM5mJ53iqRij9i37j0qYYnYx"
    }
})