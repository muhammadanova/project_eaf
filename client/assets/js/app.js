var plan = function() {
  var baseUrl = 'http://localhost:3000'

  var loginPage = $("#loginPage")
  var planList = $("#planList")
  var loading = $("#loading")
  var homeSVG = $("#home-svg")

  var loginForm = $("#login-form")
  var registForm = $("#register-form")
  var addPlanForm = $("#addPlanForm")
  var editPlanForm = $("#editPlanForm")

  var addTitle = $("#addTitle")
  var addProvince = $("#addProvince")
  var addCity = $("#addCity")
  var addDatePlaen = $("#addDatePlan")
  var addTransportation = $("#addTransportation")
  var addBudget = $("#addBudget")
  var addItinerary = $("#addItinerary")

  var editTitle = $("#editTitle")
  var editProvince = $("#editProvince")
  var editCity = $("#editCity")
  var editDatePlaen = $("#editDatePlan")
  var editTransportation = $("#editTransportation")
  var editBudget = $("#editBudget")
  var editItinerary = $("#editItinerary")

  var emailLogin = $("#email-login")
  var passLogin = $("#password-login")

  var userRegist = $("#username-regis")
  var emailRegist = $("#email-regis")
  var passRegist = $("#password-regis")

  var modalAddPlan = $("#addPlan")
  var modalDetailPlan = $("#detailPlan")
  var modalEditPlan = $("#editPlan")

  startSet()

  function startSet(){
    if(!localStorage.getItem('token')){
      planList.hide()
      loading.hide()
      homeSVG.hide()
      registForm.hide()
    }else{
      
    }
  }

  loginForm.on('submit', function(e){
    e.preventDefault()
    login()
  })

  registForm.on('submit', function(e){
    e.preventDefault()
    register()
  })

  function login () {
    $.ajax(`${baseUrl}/login`, {
      method: "POST",
      data: {
        email: emailLogin.val(),
        password: passLogin.val()
      },
      success: function(response){
        let token = response.token
        localStorage.setItem("token", token)
        // $("#loginPage").hide()
        // showAll()
        // $("#planPage").show()
        console.log("berhasil login")
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully login!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: function(err){
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...', 
          text: err.responseJSON.msg
        })
      }
    })
  }

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax(`${baseUrl}/google-sign-in`,{
    method:"POST",
    data:{
      id_token
  },
  success: function(response){
    let token = response.token
    localStorage.setItem("token", token)
    // $("#loginPage").hide()
    // showAll()
    // $("#planPage").show()
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Successfully login from your Google account!',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
    console.log("berhasil login")
  },
  error: function(err){
    console.log(err)
    }
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.clear()
      // $("#planPage").hide()
      // $("#loginPage").show()
  });
  // Swal.fire({
  //   title: 'Are you sure you want to logout?',
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes!'
  // }).then((result) => {
  //   if (result.value) {
  //     localStorage.clear()
  //     $("#planPage").hide()
  //     $("#loginPage").show()
  //     Swal.fire(
  //       'Logged out!'
  //     )
  //   }
  // })
  }

  function register(){
    $.ajax(`${baseUrl}/register`, {
      method: "POST",
      data: {
        username: userRegist.val(),
        email: emailRegist.val(),
        password: passRegist.val()
      },
      success: function(response){
        console.log("berhasil", response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'successfully registered! sign in to start your Plan!',
          showConfirmButton: false,
          timer: 3000
        })
      },
      error: function(err){
        console.log(err)
        let errors = '<div class="flex-column" style="color:red">'
        err.responseJSON.errMsg.forEach(salah => {
          errors += `<div class="col"> ${salah} </div>`
        })
        errors += "</div>"
        Swal.fire({
          icon: 'error',
          title: 'Oops...', 
          html: errors
        })
      }
    })
  }
}();