import "@testing-library/jest-dom";
import axios from "axios";

// 문서 참고해서 jest.mock, mockResolvedValue 사용하기
jest.mock("axios");

const getUser = (id) => {
  return axios.post(`/user/${id}.json`).then((resp) => resp.data);
};

test("first axios mocking - get", async () => {
  // 여기에 코드 작성
  axios.post.mockResolvedValue({
    data: {
      name: "john",
      email: "john0000@naver.com",
    },
  });

  return expect(getUser()).resolves.toEqual({
    name: "john",
    email: "john0000@naver.com",
  });
});
