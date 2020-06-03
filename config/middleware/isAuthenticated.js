// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports.isAuth = (req, res, next) =>  {
    // If the user is logged in, continue with the request to the restricted route
      //just confirms that req.session.passport.user exists..which means its authenticated
      if (req.isAuthenticated()) {
        next();
    } else {
        //res.status(401).json({ msg: 'You are not authorized to view this resource' });
        return res.redirect("/");
    }
  }
    // If the user isn't logged in, redirect them to the login page
    
