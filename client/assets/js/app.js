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

  var idEdit = $("#editId")
  var editTitle = $("#editTitle")
  var editProvince = $("#editProvince")
  var editCity = $("#editCity")
  var editDatePlan = $("#editDatePlan")
  var editTransportation = $("#editTransportation")
  var editBudget = $("#editBudget")
  var editItinerary = $("#editItinerary")
  var editProvinceOption = $("#editProvinceOption")
  var editCityOption = $("#editCityOption")


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

  var contentDetail = $("#contentDetail")

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
    apiProvince()
    getData()
  })

  

  addPlanForm.on('submit', function(e){
    e.preventDefault()
    $.ajax({
      method : "POST",
      url : `${baseUrl}/plan`,
      headers: {
        token : localStorage.getItem('token')
      },
      data: { 
        title: addTitle.val(),
        province: $('#addProvince option:selected').text(),
        city: $('#addCity option:selected').text(),
        date_plan: addDatePlan.val(),
        itinerary: addItinerary.val(),
        transportation: addTransportation.val(),
        budget: addBudget.val(),
      },
    })
    .done(res => {
      modalAddPlan.modal('hide')
      clearForm(addPlanForm)
      getData()
    })
    .fail(err => {
      console.log(err)
    })
    
  })

  function findPlan(id){
    let token = localStorage.getItem('token')
    $.ajax({
      method: "GET",
      url: `${baseUrl}/plan/${id}`,
      headers: {
        token : token
      }
    })
    .done(res => {
      console.log(res.province)
      let formatDate = new Date(res.date_plan).toISOString().substring(0, 10)
      idEdit.val(res.id)
      editTitle.val(res.title)
      editProvince.append(
        `<option value="${res.province}" id="editProvinceOption">${res.province}</option>`
      )
      editCity.append(
        `<option value="${res.city}" id="editProvinceOption">${res.city}</option>`
      )
      editCity.prop("disabled", true);
      editDatePlan.val(formatDate)
      editItinerary.val(res.itinerary)
      editTransportation.val(res.transportation)
      editBudget.val(res.budget)

      let loadProvinces = false;
    
      editProvince.on('click', function(e) {
        if (!loadProvinces){
          $.ajax({
            method: "GET",
            url: 'https://x.rajaapi.com/MeP7c5nek1X3p5SLDCoWkih8P9sFQaqsXxJTPUTiMcMJcz9IZSnqgiCLF1/m/wilayah/provinsi',
          })
          .done(res => {
            loadProvinces = true
            console.log(res)
            editProvince.empty()
            editCity.empty()
            res.data.map(el => {
              editProvince.append(
                `<option value="${el.id}">${el.name}</option>`
              )
            })
          })
          .fail(err => {
            console.log(err)
          })
        }
      })
      editProvince.on('change', function(e) {
        e.preventDefault()
        let id_prov = editProvince.val()
        $.ajax({
          method: "GET",
          url: `https://x.rajaapi.com/MeP7c5nek1X3p5SLDCoWkih8P9sFQaqsXxJTPUTiMcMJcz9IZSnqgiCLF1/m/wilayah/kabupaten?idpropinsi=${id_prov}`,
        })
        .done(res => {
          editCity.empty()
          editCity.prop("disabled", false);
          res.data.map(el => {
            editCity.append(
              `<option value="${el.id}">${el.name}</option>`
            )
          })
        })
      })
      detailDataPlan(res)
    })
    .fail(err => {
      console.log(err)
    })
  }

  function detailDataPlan(res){
    let formatDate = new Date(res.date_plan).toISOString().substring(0, 10)
    contentDetail.empty()
    contentDetail.append(`
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">DETAIL PLAN</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h5>${res.title}</h5>
        <h5>${res.city}, ${res.province}</h5>
        <p>${formatDate}</p>
        <h5>${formatMoney(res.budget)}</h5>
        <h5>${res.transportation}</h5>
        <p>${res.itinerary}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div> 
    `)
  }

  function formatMoney(money) {
    let result = 'Rp. '
    result += (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return result
  }

  editPlanForm.on("submit", function(e){
    e.preventDefault()
    let token = localStorage.token
    $.ajax({
      method: "PUT",
      url: `${baseUrl}/plan/${idEdit.val()}`,
      headers: {
        token : token
      },
      data: {
        title: editTitle.val(),
        province: $('#editProvince option:selected').text(),
        city: $('#editCity option:selected').text(),
        date_plan: editDatePlan.val(),
        itinerary: editItinerary.val(),
        transportation: editTransportation.val(),
        budget: editBudget.val()
      }
    })
    .done(res => {
      modalEditPlan.modal('hide')
      clearForm(editPlanForm)
      getData()
    })
    .fail(err => {
      console.log(err)
    })
  })

  function deletePlan(id){
    console.log('masuk')
    let token = localStorage.getItem('token')
    if(confirm('Anda yakin ingin menghapus?')){
      $.ajax({
        method: "DELETE",
        url: `${baseUrl}/plan/${id}`,
        data: {},
        headers: {
          token : token
        }
      })
      .done(res => {
        getData()
      })
    }
  }

  function apiProvince(){
    $.ajax({
      method: "GET",
      url: `https://x.rajaapi.com/MeP7c5nek1X3p5SLDCoWkih8P9sFQaqsXxJTPUTiMcMJcz9IZSnqgiCLF1/m/wilayah/provinsi`,
    })
    .done(res => {
      res.data.map(el => {
        addProvince.append(`
          <option value="${el.id}">${el.name}</option>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
  }

  function apiCity(id){
    $.ajax({
      method: "GET",
      url: `https://x.rajaapi.com/MeP7c5nek1X3p5SLDCoWkih8P9sFQaqsXxJTPUTiMcMJcz9IZSnqgiCLF1/m/wilayah/kabupaten?idpropinsi=${id}`
    })
    .done(res => {
      addCity.empty()
      res.data.map(el => {
        addCity.append(`
          <option value="${el.id}">${el.name}</option>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
  }

  addProvince.on('change', function(e){
    e.preventDefault()
    let id_prov = addProvince.val()
    apiCity(id_prov)
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
        let formatDate = new Date(el.date_plan).toISOString().substring(0, 10)
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
                  <button class="btn btn-white" onclick="deletePlan(${el.id})"><i class="fa fa-trash"></i>&nbsp;Delete</button>
                </div>
              </div>
            </div>
            <div class="general">
              <h5 class="mb-3">${el.title}</h5>
              <p><i class="fa fa-calendar"></i>&nbsp;${formatDate}</p>
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
        url: `${baseUrl}/plan/${id}`,
        data: {},
        headers: {
          token : token
        }
      })
      .done(res => {
        getData()
      })
    }
  }

  function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax(`${baseUrl}/google-sign-in`, {
      method:"POST",
      data: {
        id_token
      },
      success: function(res) {
        console.log(res.w3)
        let token = res.token
        localStorage.setItem("token", token)
        localStorage.setItem('type', 'google')
        startSet()
        getData()
      }
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

function deletePlan(id){
  plan.deletePlan(id)
}