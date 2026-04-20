import Record from "../models/record.model.js";

// DASHBOARD

export const getDashboardService = async (user) => {

  // 👤 USER DASHBOARD
  if (user.role === "user") {

    const result = await Record.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: "$user",
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      }
    ]);

    const data = result[0] || { totalIncome: 0, totalExpense: 0 };

    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      totalIncome: data.totalIncome,
      totalExpense: data.totalExpense,
      balance: data.totalIncome - data.totalExpense
    };
  }
  else{
    // 👨‍💼 ADMIN DASHBOARD

    // 1️⃣ overall
    const overall = await Record.aggregate([
        {
        $group: {
            _id: null,
            totalIncome: {
            $sum: {
                $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
            },
            totalExpense: {
            $sum: {
                $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
            }
        }
        }
    ]);

    const overallData = overall[0] || {
        totalIncome: 0,
        totalExpense: 0
    };

    // 2️⃣ user-wise
    const users = await Record.aggregate([
        {
        $group: {
            _id: "$user",
            totalIncome: {
            $sum: {
                $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
            },
            totalExpense: {
            $sum: {
                $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
            }
        }
        },
        {
        $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
        }
        },
        { $unwind: "$user" },
        {
        $project: {
            _id: 0,
            userId: "$_id",
            name: "$user.name",
            email: "$user.email",
            totalIncome: 1,
            totalExpense: 1,
            balance: {
            $subtract: ["$totalIncome", "$totalExpense"]
            }
        }
        }
    ]);

    return {
        overall: {
        totalIncome: overallData.totalIncome,
        totalExpense: overallData.totalExpense,
        balance: overallData.totalIncome - overallData.totalExpense
        },
        users
    };
    };


}

  
//CATEGORY SUMMARY
export const getCategorySummaryService = async (userId) => {
    return await Record.aggregate([
        { $match: { user: userId } },
        {
            $group: {
                _id: "$category",
                income: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                    }
                },
                expense: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                    }
                }
            },
            
            
            
        }
    ]);
};

//MONTHLY TRENDS
export const getMonthlyTrendsService = async (userId) => {
    return await Record.aggregate([
        { $match: { user: userId } },
        {
            $group: {
                _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" }
                },
                income: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                    }
                },
                expense: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                    }
                }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        {
            $project: {
                _id: 0,
                month: "$_id.month",
                year: "$_id.year",
                income: 1,
                expense: 1
            }
        }
    ]);
};

//TOP SPENDING
export const getTopSpendingService = async (userId) => {
    return await Record.aggregate([
        { $match: { user: userId, type: "expense" } },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },
        { $sort: { total: -1 } },
        { $limit: 5 },
        {
            $project: {
                _id: 0,
                category: "$_id",
                expense: "$total"
            }
        }
    ]);
};

//RECENT ACTIVITY
export const getRecentActivityService = async (userId) => {
    return await Record.aggregate([
        { $match: { user: userId } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 }
    ]);
};