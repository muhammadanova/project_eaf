var plan = function() {
  var baseUrl = 'http://localhost:3000'

  var bgsidenav = $("#bgsidenav")
  var loginPage = $("#loginPage")
  var planList = $("#planList")
  var loading = $("#loading")
  var homeSVG = $("#home-svg")

  var loginForm = $("#login-form")
  var registForm = $("#register-form")
  var addPlanForm = $("#addPlanForm")
  var editPlanForm = $("#editPlanForm")

  var rowPlanList = $("#data-row")

  var addTitle = $("#addTitle")
  var addProvince = $("#addProvince")
  var addCity = $("#addCity")
  var addDatePlan = $("#addDatePlan")
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

  var signUp = $("#signup")
  var signIn = $("#signin")
  var jalanJalan = $("#jalan-jalan")
  var doLogout = $("#doLogout")

  startSet()

  function startSet(){
    if(!localStorage.getItem('token')){
      bgsidenav.show()
      loginPage.show()
      planList.hide()
      loading.hide()
      homeSVG.hide()
      registForm.hide()
    }else{
      planList.hide()
      loginPage.hide()
      bgsidenav.hide()
      homeSVG.hide()
      setTimeout(() => {
        loading.hide()
      }, 1500);
      setTimeout(() => {
        homeSVG.show()
      }, 1500);
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

  signUp.on('click', function(e){
    e.preventDefault()
    loginForm.hide().fadeOut(80);
    registForm.show().delay(80).fadeIn(80);
  })

  signIn.on('click', function(e){
    e.preventDefault()
    registForm.hide().fadeOut(80);
    loginForm.show().delay(80).fadeIn(80);
  })

  doLogout.on('click', function(e) {
    e.preventDefault()
    if(localStorage.getItem('type')){
      signOutGoogle()
    }
    localStorage.clear()
    startSet()
  })

  jalanJalan.on('click', function(e){
    e.preventDefault()
    homeSVG.hide()
    planList.show()
    getData()
  })

  addPlanForm.on('submit', function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: `${baseUrl}/plan`,
      data: { 
        title: addTitle.val(),
        province: addProvince.val(),
        city: addCity.val(),
        date_plan: addDatePlan.val(),
        itinerary: addItinerary.val(),
        transportation: addTransportation.val(),
        budget: addBudget.val(),
      },
      headers: {
        token : localStorage.getItem('token')
      }
    })
    .done(res => {
      modalAddTodo.modal('hide')
      clearForm(addPlanForm)
      getData()
    })
  })

  function getData(){
    $.ajax({
      method: "GET",
      url: `${baseUrl}/plan`,
      headers: {
        token : localStorage.getItem('token')
      },
    })
    .done(res => {
      console.log(res)
      emptyData()
      setData(res)
    })
    .fail(err => {
      planList.hide()
    })
  }

  function setData(data){
    if(data.length === 0){
      rowPlanList.append(
        `<div id="dataNoRecords">
          <h4 class="text-center p-nodata">NO DATA</h4>
        </div>`
      )
    }else{
      data.map((el, index) => {
        rowPlanList.append(
        `<div class="col-md-4">
          <div class="card-style">
            <div class="additional">
              <div class="user-card">
                <div class="level center">Planning</div>
                <div class="points center">Travel</div>
              </div>
              <div class="more-info">
                <div class="button-action-card">
                  <button class="btn btn-white" type="button" onclick="findPlan(${el.id})" data-toggle="modal" data-target="#detailPlan" data-whatever="@getbootstrap"><i class="fa fa-info"></i>&nbsp;Detail</button>
                  <button class="btn btn-white" type="button" onclick="findPlan(${el.id})" data-toggle="modal" data-target="#editPlan" data-whatever="@getbootstrap"><i class="fa fa-pencil"></i>&nbsp;Edit</button>
                  <button class="btn btn-white" onclick="deletePlan"><i class="fa fa-trash"></i>&nbsp;Delete</button>
                </div>
              </div>
            </div>
            <div class="general">
              <h5 class="mb-3">${el.title}</h5>
              <p><i class="fa fa-calendar"></i>&nbsp;${el.date_plane}</p>
              <p><i class="fa fa-map-marker"></i>&nbsp;${el.city}, ${el.province}</p>
            </div>
          </div>
        </div>`
        )
      })
    }
  }

  function emptyData(){
    rowPlanList.empty()
  }

  function formatDate(date){
    if(date === null){
      return date
    }else{
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()

          if(month.length < 2) month = '0' + month
          if(day.length < 2) day = '0' + day

          return [year, month, day].join('-')
    }
  }

  function clearForm(inputed){
    inputed.find('input').val("")
    inputed.find('option:selected').prop("selected", false)
  }

  function clearErrorForm(inputed){
    inputed.find('input').removeClass("is-invalid")
    inputed.find('option:selected').removeClass("is-invalid")
  }

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
        localStorage.setItem('email', response.user.email)
        localStorage.setItem('username', response.user.username)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully login!',
          showConfirmButton: false,
          timer: 1500
        })
        loginPage.hide()
        bgsidenav.hide()
        homeSVG.show()
      },
      error: function(err){
        Swal.fire({
          icon: 'error',
          title: 'Oops...', 
          text: err.responseJSON.msg
        })
      }
    })
  }

  function deletePlan(id){
    let token = localStorage.getItem('token')
    if(confirm('Anda yakin ingin menghapus?')){
      $.ajax({
        method: "DELETE",
        url: `${baseUrl}/todos/${id}`,
        data: {},
        headers: {
          Bearer : localStorage.getItem('token')
        }
      })
      .done(res => {
        getData()
      })
    }
  }

  function onSignIn(googleUser) {
    var ticket = googleUser.getBasicProfile();
    // ID => profile.getId() Name => profile.getName() Image URL => profile.getImageUrl() Email => profile.getEmail()
    $.ajax({
      method: "POST",
      url: `${baseUrl}/google-sign-in`,
      data: {
        email: ticket.getEmail()
      }
    })
    .done(res => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('email', ticket.getEmail())
      localStorage.setItem('type', 'google')
      usersHeader.text(localStorage.getItem('email'))
      showAlert()
      successAlert()
      clearAlert()
      startSet()
      getData()
    })
    .fail(err => {
      showAlert()
      errorAlert()
      clearAlert()
    })
  }

  function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('Anda berhasil sign out');
    });
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
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'successfully registered! sign in to start your Plan!',
        //   showConfirmButton: false,
        //   timer: 3000
        // })
      },
      error: function(err){
        console.log(err)
        // let errors = '<div class="flex-column" style="color:red">'
        // err.responseJSON.errMsg.forEach(salah => {
        //   errors += `<div class="col"> ${salah} </div>`
        // })
        // errors += "</div>"
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...', 
        //   html: errors
        // })
      }
    })
  }
  return ({
    onSignIn: onSignIn,
    findPlan: findPlan,
    deletePlan: deletePlan
  })
}();

function onSignIn(googleUser) {
  plan.onSignIn(googleUser);
}

function findPlan(id){
  plan.findPlan(id)
}

function deleteTodo(id){
  plan.deletePlan(id)
}