const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer", "");

            // (req.header("Authorization") || "").replace("Bearer", "").trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found.",
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token not match",
            });
        }
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while token Verifying.",
        });
    }
}

exports.Auth = (async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found.",
        });
    }
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData.id);
  
    next();
  });
  
  exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Student only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}


// isInstructor
exports.isLecturer = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Lecturer") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Lecturer only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Admin only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}