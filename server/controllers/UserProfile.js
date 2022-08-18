const User = require("../models/User");
const Url = require("../models/Url");
const Click = require("../models/Click");
const sub = require("date-fns/sub");
const getUnixTime = require("date-fns/getUnixTime");

const getUserData = async (req, res) => {

  const refreshToken = req?.cookies?.jwt;
  const { page = 1, limit = 10 } = req.query;
  console.log(req.query, 'req.query');
  if (!refreshToken) return res.sendStatus(404); // No content

  try {
    const foundUser = await User.find({ refreshToken: refreshToken });
    const userId = foundUser[0].id;
    // TODO pagination not working, appears that page is not being set and page 2 returns empty array
    const links = await Url.aggregate([
      { $match: { userId: userId }},
      { $limit: limit * 1 },
      { $skip: (Number(page) - 1) * limit },
      { $unset: ["userId", "_id", "__v"]},
      { $lookup: {
        from: "clicks",
        localField: "urlKey",
        foreignField: "urlKey",
        as: "click-docs",
        pipeline: [
          { $unset: ["_id", "userId"]}
        ]
      }},

    ]);
    console.log('links', links);
    const count = await Url.countDocuments({ userId: userId });

    const oneWeekClicks = await Click.aggregate([
      {
        $match: {
          $and: [
            { userId: userId },
            {
              timestamp: {
                $gt: String(Date.now() - 604800000),
                $lt: String(Date.now()),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$urlKey",
          total: { $count: {} },
        },
      }
    ]);

    const oneMonthClicks = await Click.aggregate([
      {
        $match: {
          $and: [
            { userId: userId },
            {
              timestamp: {
                $gt: String(Date.now() - 2629800000),
                $lt: String(Date.now()),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$urlKey",
          total: { $count: {} },
        },
      },
    ]);

    if (links.length) {
      res.status(200).send({
        links,
        oneWeekClicks,
        oneMonthClicks,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } else {
      res
        .status(404)
        .send({ message: "Looks like you haven't shortened any links yet!" });
    }
  } catch (err) {
    console.log(err, 'err');
    res.status(500).send(err);
  }
};

module.exports = { getUserData };