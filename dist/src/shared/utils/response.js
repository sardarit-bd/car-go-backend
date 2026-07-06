const sendResponse = (res, status, success, message, data = null, pagination = null) => {
    return res.status(status).json({
        success,
        message,
        data,
        ...(pagination ? { pagination } : {}),
    });
};
export default sendResponse;
