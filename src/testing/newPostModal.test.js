// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import newPostModal from "../components/newPostModal";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeData = {
    "id": "first-post",
    "title": "My First Post",
    "content": "Hello World!",
    "views": 1,
    "timestamp": 1555832341
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<newPostModal id="123" />, container);
  });

  it('calls login and sets the flash messages', () => {
    http.onPost('https://localhost:44345').reply(200, { data: fakeData });
    return store.dispatch('Postings')
        .then(() => expect(store.state.messages).toHaveLength(1));
});
//   expect(container.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});