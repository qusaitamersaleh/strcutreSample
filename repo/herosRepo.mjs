 
import catchAsync from "../utils/catchAsync.mjs"; // Assuming you have a utility for handling async errors

const getHeros = catchAsync(async (req, res) => {
   
  // Return paginated response
  return res.status(200).json({
    abc:"abc"
  });
});

const suggestHero = catchAsync(async (req, res) => {});
export default {
  getHeros,
  suggestHero,
};
