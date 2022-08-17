// const User = require("../models/User");
// const Url = require("../models/Url");
// const Click = require("../models/Click");
// const sub = require("date-fns/sub");
// const getUnixTime = require("date-fns/getUnixTime");

// const getUserData = async (req, res) => {
//   const refreshToken = req?.cookies?.jwt;

//   if (!refreshToken) return res.sendStatus(404); // No content

//   try {
//     const foundUser = await User.find({ refreshToken: refreshToken });
//     console.log(foundUser[0]);
//     const userId = foundUser[0].id;
//     const links = await Url.aggregate([
//       { $match: { userId: userId } },

//       {
//         $group: {
//           _id: null,
//           totalClicks: { $sum: "$clicks" },
//           docs: { $push: "$$CURRENT" },
//         },
//       },
//     ]);

//     const oneWeekClicks = await Click.aggregate([
//       {
//         $match: {
//           $and: [
//             { userId: userId },
//             {
//               timestamp: {
//                 $gt: String(Date.now() - 604800000),
//                 $lt: String(Date.now()),
//               },
//             },
//           ],
//         },
//       },
//       {
//         $group: {
//           _id: "$urlKey",
//           total: { $count: {} },
//         },
//       }
//     ]);

//     const oneMonthClicks = await Click.aggregate([
//       {
//         $match: {
//           $and: [
//             { userId: userId },
//             {
//               timestamp: {
//                 $gt: String(Date.now() - 2629800000),
//                 $lt: String(Date.now()),
//               },
//             },
//           ],
//         },
//       },
//       {
//         $group: {
//           _id: "$urlKey",
//           total: { $count: {} },
//         },
//       },
//     ]);

//     const clickObjs = await Click.find({ userId: userId });

//     if (links.length) {
//       res.status(200).send({links: links[0], oneWeekClicks, oneMonthClicks, clickObjs});
//     } else {
//       res
//         .status(404)
//         .send({ message: "Looks like you haven't shortened any links yet!" });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// module.exports = { getUserData };

const User = require("../models/User");
const Url = require("../models/Url");
const Click = require("../models/Click");
const sub = require("date-fns/sub");
const getUnixTime = require("date-fns/getUnixTime");

const getUserData = async (req, res) => {
  const refreshToken = req?.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(404); // No content

  try {
    const foundUser = await User.find({ refreshToken: refreshToken });
    console.log(foundUser[0]);
    const userId = foundUser[0].id;
    const links = await Url.aggregate([
      { $match: { userId: userId } },

      {
        $group: {
          _id: null,
          totalClicks: { $sum: "$clicks" },
          docs: { $push: "$$CURRENT" },
        },
      },
    ]);

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

    const clickObjs = await Click.find({ userId: userId });

    if (links.length) {
      res.status(200).send({links: links[0], oneWeekClicks, oneMonthClicks, clickObjs});
    } else {
      res
        .status(404)
        .send({ message: "Looks like you haven't shortened any links yet!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getUserData };