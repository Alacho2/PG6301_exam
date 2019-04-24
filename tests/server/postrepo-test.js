const {createPost, getOnePost, getAllPosts, initWithSomePosts} = require("../../src/server/db/postRepo");

describe("PostRepo", () => {

  beforeEach(() => {
    createPost("Håvard", "Sjokoladekake er godt");
    createPost("Chef", "Ben and jerrys er godt");
    createPost("Håvard", "Flødebolle er dansk");
  });

  it("Should create a post", () => {
    const post = getOnePost("1");

    expect(post.id).toBe('1');
    expect(post.writer.birthday).toBe("25.05.1994");
    expect(post.text.includes("Sjokoladekake")).toBe(true);
  })

  it("Should get all posts", () => {
    initWithSomePosts();
    expect(getAllPosts().length).toBeGreaterThanOrEqual(6)
  });

});