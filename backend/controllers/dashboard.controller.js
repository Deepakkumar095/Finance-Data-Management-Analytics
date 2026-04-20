import {
  getDashboardService,
  getCategorySummaryService,
  getMonthlyTrendsService,
  getTopSpendingService,
  getRecentActivityService
} from "../services/dashboard.service.js";

// DASHBOARD
export const getDashboard = async (req, res) => {
  try {
    
    const dashboardData = await getDashboardService(req.user);

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboardData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard"
    });
  }
};


// CATEGORY SUMMARY
export const getCategorySummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryData = await getCategorySummaryService(userId);

    return res.status(200).json({
      success: true,
      message: "Category summary fetched successfully",
      data: categoryData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch category summary"
    });
  }
};


// MONTHLY TRENDS
export const getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user._id;
    const monthlyData = await getMonthlyTrendsService(userId);

    return res.status(200).json({
      success: true,
      message: "Monthly trends fetched successfully",
      data: monthlyData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch monthly trends"
    });
  }
};


// TOP SPENDING
export const getTopSpending = async (req, res) => {
  try {
    const userId = req.user._id;
    const topSpendingData = await getTopSpendingService(userId);

    return res.status(200).json({
      success: true,
      message: "Top spending fetched successfully",
      data: topSpendingData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch top spending"
    });
  }
};


// RECENT ACTIVITY
export const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const recentActivityData = await getRecentActivityService(userId);

    return res.status(200).json({
      success: true,
      message: "Recent activity fetched successfully",
      data: recentActivityData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch recent activity"
    });
  }
};