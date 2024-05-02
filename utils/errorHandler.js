
const errorHandler = (error, res) => {
    return res.status(500).json({
        message: 'Internal Server Error',
        error: String(error)
    });
};

module.exports=errorHandler;
