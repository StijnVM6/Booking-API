const customErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: `An error occurred on the server, please double-check your request!`
    });
};

export default customErrorHandler;