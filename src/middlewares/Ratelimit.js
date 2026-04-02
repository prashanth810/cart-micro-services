const rateLimitCache = new Map();

const WINDOW_SIZE = 10 * 60 * 1000; // 10 minutes
const LIMIT = 5;

const Ratelimit = (req, res, next) => {
    const ip = req.ip; // here user ip will gets
    const now = Date.now();

    const user = rateLimitCache.get(ip);

    // First request
    if (!user) {
        rateLimitCache.set(ip, { count: 1, startTime: now });
        return next();
    }

    // If time window expired
    if (now - user.startTime > WINDOW_SIZE) {
        rateLimitCache.set(ip, { count: 1, startTime: now });
        return next();
    }

    // If limit exceeded
    if (user.count >= LIMIT) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Try again after 10 minutes."
        });
    }

    // Increase count
    user.count++;
    next();
};

export default Ratelimit;