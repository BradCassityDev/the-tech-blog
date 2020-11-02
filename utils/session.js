// Reload the session to keep alive
const keepAlive = (req, res, next) => {
    req.session.reload(function(err) {
        // session updated
    })
};
  
module.exports = keepAlive;

