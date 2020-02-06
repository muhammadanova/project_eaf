var baseUrl = 'http://localhost:3000'

// $(window).on("load", function() {
//   let token = localStorage.getItem("token")
//   if(token) {
//     $("#loginPage").hide()
//     $("#planPage").show()
//     showAll()
//   } else {
//     $("#loginPage").show()
//     $("#planPage").hide()
//   }
// })

$("#login-form").on('submit', function(e){
  e.preventDefault()
  login()
})

$("#register-form").on('submit', function(e){
  e.preventDefault()
  register()
})

function login () {
  $.ajax(`${baseUrl}/login`, {
    method: "POST",
    data: {
      email:$('#email-login').val(),
      password:$('#password-login').val()
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
      username:$('#username-regis').val(),
      email:$('#email-regis').val(),
      password:$('#password-regis').val()
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