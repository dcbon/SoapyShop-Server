async function authorization(req, res, next) {
  try {
    if (req.userData.role == 'admin') next()
    else throw { msg: 'Unauthorized Access', status: 401 }
  }
  catch(err) {
    console.log(err, '>>>>>>>> author');
    next(err)
  }
}

module.exports = authorization