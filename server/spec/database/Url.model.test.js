const mongoose = require("mongoose");
const { connectDB, dropDB, dropCollections } = require("./setupTestDB");
const Url = require("../../models/Url").Url;
const { getUrlKey } = require("../../utils/urlKey");
const { validateUrl } = require("../../utils/validateUrl");

beforeAll(async () => {
  await connectDB();
})

afterAll(async () => {
  await dropDB();
})

afterEach(async () => {
  await dropCollections();
})

describe("Url Model", () => {
  it("Should successfully create a new Url", async () => {
    const urlKey = getUrlKey();
    const validUrl = {
      url_id: urlKey,
      original_url: "www.laurendanderson.com/dev/minifymy.link",
      shortened_url: "minifymy.link/" + urlKey,
    }

    try {
      const newUrl = new Url(validUrl);
      await newUrl.save();
      expect(newUrl._id).toBeDefined();
      expect(newUrl.date).toBeDefined();
      expect(newUrl.clicks).toBe(0);
    } catch (err) {
      console.error(err);
    }
  })
})