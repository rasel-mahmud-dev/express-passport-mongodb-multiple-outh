
const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('index', {
    currentUser: req.user
  })
})

router.get('/api/currentUser', (req, res)=>{
  res.send(req.user)
  console.log(req.session);
  
})

router.get('/api/logout', (req, res)=>{
  req.logOut()
  res.redirect('/')
})


module.exports = router