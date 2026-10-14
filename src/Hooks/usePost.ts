import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function usePost(){
 function getAllPost() {
    const token = localStorage.getItem("userToken");

    return axios.get("https://route-posts.routemisr.com/posts?sort=-createdAt", {
      headers: {
        token: token,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return useQuery({
    queryKey: ["getAllPost"],
    queryFn: getAllPost,
  });
}