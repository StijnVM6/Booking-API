import logger from "../utils/log.js";

const log = (req, res, next) => {
    const startDate = new Date();
    next();
    const duration = new Date() - startDate;
    logger.info({
        level: 'info',
        message: `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms `
    });
};

export default log;