const mongoose = require("mongoose");
const { connectDB, dropDB, dropCollections } = require("./setupTestDB");
const User = require("../../models/User").User;
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await connectDB();
})

afterAll(async () => {
  await dropDB();
})

afterEach(async () => {
  await dropCollections();
})

describe("User Model", () => {
  it ("Should successfully create a new user", async () => {
    try {
      const hash = await bcrypt.hash("johnnya", 10);
      let validUser = {
        fullName: "John Appleseed",
        email: "johnappleseed@gmail.com",
        hash: hash,
      }
      const newUser = new User(validUser);
      await newUser.save();
      expect(newUser._id).toBeDefined();
      expect(newUser.hash).toBeDefined();
      expect(newUser.email).toBe(validUser.email);
    } catch (err) {
      console.error(err);
    }
  })

  it("Should fail for new user without required fields", async () => {
    let invalidUser = {
      fullName: "Johnny Appleseed",
      email: "",
      password: "johnnya",
      verifyPassword: "johnnya"
    }

    try {
      const newUser = new User(invalidUser);
      await newUser.save();
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors).toBeDefined();
    }
  })

  it("Should fail for new User with fields of the wrong type", async () => {
    let invalidUser = {
      fullName: "Johnny Appleseed",
      email: false,
      password: "johnnya",
      verifyPassword: "johnnya",
    }

    try {
      const newUser = new User(invalidUser);
      await newUser.save();
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors).toBeDefined();
    }
  })
})