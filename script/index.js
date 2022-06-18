let content = document.getElementById("content");
let listProduct = document.getElementById("list-product");
let username = "admin";
let password = "password";
let API = "https://website-3h.herokuapp.com/admin/api/v1";
let listImageLogo = [
  "channel.png",
  "nike.png",
  "hermes.png",
  "gucci.jpeg",
  "adidas.png",
  "hm.jpeg",
  "Levi's.svg",
  "puma.jpeg",
  "dior.jpeg",
  "lv.png",
];
let imageURL = "";

function loadHomeContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Product List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddProductForm()">Add new product</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Price</th>
                  <th scope="col">Short Description</th>
                  <th style="width: 12%" scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListProduct();
}

function loadListProduct() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/products?size=100",
    success: function (data) {
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
            <td>${data.content[i].id}</td>
            <th scope="row">
                <img src="${data.content[i].image}" alt="" style="width: 150px">
            </th>                    
            <td>${data.content[i].name}</td>
            <td>${data.content[i].brand?.name}</td>
            <td>${data.content[i].price}</td>
            <td>${data.content[i].shortDescription}</td>
            <td><button class="btn btn-outline-secondary mr-2" onclick="showEditProduct('${data.content[i].id}')">Edit</button><Button class="btn btn-outline-danger" onclick="deleteProduct(${data.content[i].id},'${data.content[i].name}')">Del</Button></td></tr>`;
        }
      }
      document.getElementById("list-product").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function showOneProduct() {
  let html = `<div class="col-12 p-3">
                    <h1>Đang show one nhé!</h1>
                    <a onclick="loadHomeContent()">Quay về</a>
                </div>`;
  document.getElementById("content").innerHTML = html;
}

function showEditProduct(id) {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/products/" + id,
    success: function (data) {
      console.log(data)
      let html =
        "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Edit</h2>" +
        "<form id='frm-product'>" +
        "  <center><img src='" +
        data?.product?.image +
        "' alt=''></center>\n" +
        '  <div class="form-group row mt-4">\n' +
        '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="hidden" class="form-control" name="id" value=\'' +
        data?.product?.id +
        "'>\n" +
        '      <input type="text" class="form-control" name="name" value=\'' +
        data?.product?.name +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="age" class="col-sm-4 col-form-label">Price</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="price" value=\'' +
        data?.product?.price +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Competitive</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="competitive" value=\'' +
        data?.product?.competitive +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Short Description</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="shortDescription" value=\'' +
        data?.product?.shortDescription +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Description</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="description" value=\'' +
        data?.product?.description +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
      '  <div class="form-group row">\n' +
      '    <label for="score" class="col-sm-4 col-form-label">New Image</label>\n' +
      '    <div class="col-sm-8">\n' +
      '      <input type="file" class="" name="file" id="file">\n' +
      "    </div>\n" +
      "  </div>\n" +
      '    <div class="form-group row">\n' +
      '    <label for="brand" class="col-sm-4 col-form-label">Brand</label>\n' +
      '    <div class="col-sm-8" id="product-brand">\n' +
      "    </div>\n" +
      "  </div>\n" +
      '  <div class="form-group row">\n' +
      '    <label for="category" class="col-sm-4 col-form-label">Category</label>\n' +
      '    <div class="col-sm-8" id="product-category">\n' +
      "    </div>\n" +
      "  </div>\n" +
      '  <div class="form-group row">\n' +
      '    <label for="color" class="col-sm-4 col-form-label">Color</label>\n' +
      '    <div class="col-sm-8" id="product-color">\n' +
      "    </div>\n" +
      "  </div>\n" +
      '  <div class="form-group row">\n' +
      '    <label for="size" class="col-sm-4 col-form-label">Size</label>\n' +
      '    <div class="col-sm-8" id="product-size">\n' +
      "    </div>\n" +
      "  </div>\n" +
        '  <div class="row">\n' +
        '    <div class="offset-5 col-sm-2">\n' +
        '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="saveProduct(' +
        data?.product?.id +
        ", '" +
        data?.product?.code +
        "')\">Change</button>" +
        "    </div>\n" +
        "  </div>\n" +
        "</form>" +
        "</div>";
        document.getElementById("content").innerHTML = html;
        $.ajax({
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
          },
          url: API + "/brands?size=100",
          success: function (data) {
            let html = `<select id="brands-edit" value="` + data?.product?.brand?.id + ` title='Choose one...'>`;        
            for (let i = 0; i < data.content.length; i++) {
              if(data.content[i].state == true){
                html += `<option name="brands"  value="${data.content[i].id}"> ${data.content[i].name}</option>`;
              }
            }        
            html += `</select>`;
            document.getElementById("product-brand").innerHTML = html;
            $('select').selectpicker();
          },
        });
        $.ajax({
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
          },
          url: API + "/categories?size=100",
          success: function (data) {
            let html = `<select id="categorys-edit" value="` + data?.product?.category?.id + `  title='Choose one...'>`;        
            for (let i = 0; i < data.content.length; i++) {
              if(data.content[i].state == true){
                html += `<option name="categorys" value="${data.content[i].id}"> ${data.content[i].name}</option>`;
              }
            }        
            html += `</select>`;
            document.getElementById("product-category").innerHTML = html;
            $('select').selectpicker();
          },
        });
        $.ajax({
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
          },
          url: API + "/colors?size=100",
          success: function (data) {
            let html = `<select class="selectpicker" id="colors-edit" multiple  data-live-search="true" title='Choose one...'>`;
            for (let i = 0; i < data.content.length; i++) {
              if(data.content[i].state == true){
                html += `<option name="colors" value="${data.content[i].id}"> ${data.content[i].name}</option>`;
              }
            }   
            html += `</select>`;
            document.getElementById("product-color").innerHTML = html;
            $('select').selectpicker();
          },
        });
        $.ajax({
          type: "GET",
          headers: {
            "Authorization": "Basic " + btoa(username + ":" + password)
          },
          url: API + "/sizes?size=100",
          success: function (data) {
            let html = `<select class="selectpicker" id="sizes-edit" multiple  data-live-search="true" title='Choose one...'>`;
            
            for (let i = 0; i < data.content.length; i++) {
              if(data.content[i].state == true){
                html += `<option name="sizes" value="${data.content[i].id}"> ${data.content[i].name}</option>`;
              }
            }        
            html += `</select>`;
            document.getElementById("product-size").innerHTML = html;
            $('select').selectpicker();
          },
        });
    },
  });
}

function saveProduct(id, code) {
  var formData = new FormData($("#frm-product")[0]);
  var brands = $('#brands-edit').val();
  var categorys = $('#categorys-edit').val();
  var colors = $('#colors-edit').val().map(i=>Number(i));
  var sizes = $('#sizes-edit').val().map(i=>Number(i));
  formData.append("brand", brands);
  formData.append("category", categorys);
  formData.append("colors", colors);
  formData.append("sizes", sizes);  
  var file = $('#file').val()
  if (brands == ""){
    alert("Vui lòng chọn thương hiệu")
  }
  if (categorys == ""){
    alert("Vui lòng chọn thể loại")
  }
  if(file === null || file =="" || file == "undefined")
  {
    formData.delete("file")
  }

  $.ajax({
    type: "PUT", 
    url: API + "/products",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    enctype: 'multipart/form-data',
    success: loadHomeContent,
    error: function (error) {
      console.log(error);
    },
  });
}

function showAddProductForm() {
  let html =
    "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new product</h2>" +
    "<form id='frm-product'>" +
    '  <div class="form-group row mt-4">\n' +
    '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="name">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="age" class="col-sm-4 col-form-label">Price</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="price">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="score" class="col-sm-4 col-form-label">Competitive</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="competitive">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="score" class="col-sm-4 col-form-label">Short Description</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="shortDescription">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="score" class="col-sm-4 col-form-label">Description</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="description">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="brand" class="col-sm-4 col-form-label">Brand</label>\n' +
    '    <div class="col-sm-8" id="product-brand">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="category" class="col-sm-4 col-form-label">Category</label>\n' +
    '    <div class="col-sm-8" id="product-category">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="color" class="col-sm-4 col-form-label">Color</label>\n' +
    '    <div class="col-sm-8" id="product-color">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="size" class="col-sm-4 col-form-label">Size</label>\n' +
    '    <div class="col-sm-8" id="product-size">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="score" class="col-sm-4 col-form-label">Image</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="file" class="" name="file" id="file">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="row">\n' +
    '    <div class="offset-6 col-sm-2">\n' +
    '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="addProduct()">Add</button>' +
    "    </div>\n" +
    "  </div>\n" +
    "</form>" +
    "</div>";
    document.getElementById("content").innerHTML = html;
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      url: API + "/brands?size=100",
      success: function (data) {
        let html = `<select required id="brands" title='Choose one...'>`;        
        for (let i = 0; i < data.content.length; i++) {
          if(data.content[i].state == true){
            html += `<option name="brands"  value="${data.content[i].id}"> ${data.content[i].name}</option>`;
          }
        }        
        html += `</select>`;
        document.getElementById("product-brand").innerHTML = html;
        $('select').selectpicker();
      },
    });
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      url: API + "/categories?size=100",
      success: function (data) {
        let html = `<select id="categorys" required title='Choose one...'>`;        
        for (let i = 0; i < data.content.length; i++) {
          if(data.content[i].state == true){
            html += `<option name="categorys" value="${data.content[i].id}"> ${data.content[i].name}</option>`;
          }
        }        
        html += `</select>`;
        document.getElementById("product-category").innerHTML = html;
        $('select').selectpicker();
      },
    });
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      url: API + "/colors?size=100",
      success: function (data) {
        let html = `<select class="selectpicker" id="colors" multiple  data-live-search="true" title='Choose one...'>`;
        for (let i = 0; i < data.content.length; i++) {
          if(data.content[i].state == true){
            html += `<option name="colors" value="${data.content[i].id}"> ${data.content[i].name}</option>`;
          }
        }   
        html += `</select>`;
        document.getElementById("product-color").innerHTML = html;
        $('select').selectpicker();
      },
    });
    $.ajax({
      type: "GET",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      url: API + "/sizes?size=100",
      success: function (data) {
        let html = `<select class="selectpicker" id="sizes" multiple  data-live-search="true" title='Choose one...'>`;
        
        for (let i = 0; i < data.content.length; i++) {
          if(data.content[i].state == true){
            html += `<option name="sizes" value="${data.content[i].id}"> ${data.content[i].name}</option>`;
          }
        }        
        html += `</select>`;
        document.getElementById("product-size").innerHTML = html;
        $('select').selectpicker();
      },
    });
}

// function encodeImageFileAsURL(element) {
//   var file = element.files[0];
//   var reader = new FileReader();
//   reader.onloadend = function() {
//     console.log('RESULT', reader.result);
//     imageURL = reader.result;
//   }
//   reader.readAsDataURL(file);
// }

function addProduct() {
  var formData = new FormData($("#frm-product")[0]);
  var brands = $('#brands').val();
  var categorys = $('#categorys').val();
  var colors = $('#colors').val().map(i=>Number(i));
  var sizes = $('#sizes').val().map(i=>Number(i));
  formData.append("brand", brands);
  formData.append("category", categorys);
  formData.append("colors", colors);
  formData.append("sizes", sizes);
  var file = $('#file').val()
  if (brands == ""){
    alert("Vui lòng chọn thương hiệu")
  }
  if (categorys == ""){
    alert("Vui lòng chọn thể loại")
  }
  if(file === null || file =="" || file == "undefined")
  {
    formData.delete("file")
  }

  $.ajax({
    type: "POST",
    url: API + "/products",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    enctype: 'multipart/form-data',
    success: loadHomeContent,
    error: function (error) {
      console.log(error);
    },
  });
}

function deleteProduct(id, name) {
  if (confirm("Do you want to delete " + name + "???")) {
    $.ajax({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      type: "Delete",
      url: API + "/products/" + id,
      success: loadHomeContent,
      error: function (error) {
        console.log(error);
      },
    });
  }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadCategoryManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Category List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue"  onclick="showAddFormCategory()">Add new category</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th style="width: 20%" scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th style="width: 20%" scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-category">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListCategory();
}

function loadListCategory() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/categories?size=100",
    success: function (data) {
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
              <td>${i + 1}</td>
              <td>${data.content[i].name}</td>
              <td>
              <button class="btn btn-outline-secondary mr-2" onclick="showEditCategory('${data.content[i].id}')">Edit
              </button>
              <Button class="btn btn-outline-danger" onclick="deleteCategory(${
                data.content[i].id
              },'${data.content[i].name}')">Del</Button></td></tr>`;
        }
      }
      document.getElementById("list-category").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function addCategory() {
  let formData = $("#frm-category").serialize();
  console.log(formData)
  $.ajax({
    type: "POST",
    url: API + "/categories",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: formData,
    dataType: "json",
    success: loadHomeContent,
    error: function (error) {
      console.log(error);
    },
  });
}
function showEditCategory(id) {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/categories/" + id,
    success: function (data) {
      let html =
        "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Edit</h2>" +
        "<form id='frm-category'>" +
        '<div class="form-group row mt-4">\n' +
        '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="hidden" class="form-control" name="id" value=\'' +
        data?.id +"'>\n" +
        '      <input type="text" class="form-control" name="name" value=\'' +
        data?.name +"'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="age" class="col-sm-4 col-form-label"></label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="editCategory()">Edit</button>' +
        "    </div>\n" +
        "  </div>\n" +
        "</form>" +
        "</div>";
        document.getElementById("content").innerHTML = html;
    },
  });
}
function editCategory() {
  let formData = $("#frm-category").serializeArray();
  var jsonObj = {};
  $.map( formData, function( n, i ) {
     jsonObj[n.name] = n.value;
     jsonObj[n.name] = n.value;
  });
  console.log(jsonObj)
  $.ajax({
    type: "put",
    url: API + "/categories",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: JSON.stringify(jsonObj),
    processData: false,
    contentType: "application/json;",
    success: loadCategoryManagerContent,
    error: function (error) {
      console.log(error);
    },
  });
}
function deleteCategory(id, name) {
  if (confirm("Do you want to delete " + name + "???")) {
    $.ajax({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      type: "Delete",
      url: API + "/categories/" + id,
      success: loadCategoryManagerContent,
      error: function (error) {
        console.log(error);
      },
    });
  }
}

function showAddFormCategory() {
  let html =
    "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new Category" +
    "</h2>" +
    "<form id='frm-category'>" +
    '  <div class="form-group row mt-4">\n' +
    '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="name">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="row">\n' +
    '    <div class="offset-6 col-sm-2">\n' +
    '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="addCategory()">Add</button>' +
    "    </div>\n" +
    "  </div>\n" +
    "</form>" +
    "</div>";
    document.getElementById("content").innerHTML = html;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadBrandManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Brand List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue"  onclick="showAddFormBrand()">Add new brand</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListBrand();
}

function loadListBrand() {
  $.ajax({
    type: "GET",
    url: API + "/brands?size=100",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    success: function (data) {
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
                      <td>${i + 1}</td>
                      <th>
                          <img src="${data.content[i].logo}" alt="" style="width: 150px">
                      </th>
                      <td>${data.content[i].name}</td>
                      <td><Button class="btn btn-outline-danger" onclick="deleteBrand(${
                        data.content[i].id
                      },'${data.content[i].name}')">Del</Button>
                      </td>
                    </tr>`;
        }
      }
      document.getElementById("list-product").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function addBrand() {
  var formData = new FormData($("#frm-brands")[0]);
  console.log(formData)
  $.ajax({
    type: "POST",
    url: API + "/brands",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    enctype: 'multipart/form-data',
    success: loadBrandManagerContent,
    error: function (error) {
      console.log(error);
    },
  });
}
function deleteBrand(id, name) {
  if (confirm("Do you want to delete " + name + "???")) {
     $.ajax({
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
              "Authorization": "Basic " + btoa(username + ":" + password)
         },
         type: 'Delete',
         url: API + '/brands/' + id,
         success: loadBrandManagerContent,
         error: function (error) {
             console.log(error)
         }
     })
  }
}

function showAddFormBrand() {
  let html =
    "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new Brand" +
    "</h2>" +
    "<form id='frm-brands'>" +
    '  <div class="form-group row mt-4">\n' +
    '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="name">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="form-group row">\n' +
    '    <label for="score" class="col-sm-4 col-form-label">Image</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="file" class="" name="file" id="file">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="row">\n' +
    '    <div class="offset-6 col-sm-2">\n' +
    '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="addBrand()">Add</button>' +
    "    </div>\n" +
    "  </div>\n" +
    "</form>" +
    "</div>";
    document.getElementById("content").innerHTML = html;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadColorManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Color List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddFormColor()">Add new color</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-color">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListColor();
}

function loadListColor() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/colors?size=100",
    success: function (data) {
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
                          <td>${i + 1}</td>
                          <td>${data.content[i].name}</td>
                          <td><Button class="btn btn-outline-danger" onclick="deleteBrand(${
                            data.content[i].id
                          },'${data.content[i].name}')">Del</Button></td></tr>`;
        }
      }
      document.getElementById("list-color").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function addColor() {
  let formData = $("#frm-color").serializeArray();
  var jsonObj = {};
  $.map( formData, function( n, i ) {
    jsonObj[n.name] = n.value;
  });
  console.log(formData)
  $.ajax({
    type: "POST",
    url: API + "/colors",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: JSON.stringify(jsonObj),
    processData: false,
    contentType: "application/json;",
    success: loadColorManagerContent,
    error: function (error) {
      console.log(error);
    },
  });
}
function deleteColor(id, name) {
  if (confirm("Do you want to delete " + name + "???")) {
     $.ajax({
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             "Authorization": "Basic " + btoa(username + ":" + password)
         },
         type: 'Delete',
         url: API + '/colors/' + id,
         success: loadColorManagerContent,
         error: function (error) {
             console.log(error)
         }
     })
  }
}

function showAddFormColor() {
  let html =
    "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new Color" +
    "</h2>" +
    "<form id='frm-color'>" +
    '  <div class="form-group row mt-4">\n' +
    '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="name">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="row">\n' +
    '    <div class="offset-6 col-sm-2">\n' +
    '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="addColor()">Add</button>' +
    "    </div>\n" +
    "  </div>\n" +
    "</form>" +
    "</div>";
    document.getElementById("content").innerHTML = html;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadSizeManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Size List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddFormSize()">Add new size</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th style='width: 20%' scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th style='width: 20%' scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListSize();
}

function loadListSize() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/sizes?size=100",
    success: function (data) {
      console.log(data);
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
                    <td>${i + 1}</td>
                    <td>${data.content[i].name}</td>
                    <td>
                    <button class="btn btn-outline-secondary mr-2" onclick="showEditSize('${data.content[i].id}')">Edit
                    </button>
                    <Button class="btn btn-outline-danger" onclick="deleteSize(${
                      data.content[i].id
                    },'${data.content[i].name}')">Del</Button></td></tr>`;
                  }
      }
      document.getElementById("list-product").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function addSize() {
  let formData = $("#frm-size").serializeArray();
  var jsonObj = {};
  $.map( formData, function( n, i ) {
     jsonObj[n.name] = n.value;
  });
  console.log(jsonObj)
  $.ajax({
    type: "POST",
    url: API + "/sizes",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: JSON.stringify(jsonObj),
    processData: false,
    contentType: "application/json;",
    success: loadSizeManagerContent,
    error: function (error) {
      console.log(error);
    },
  });
}
function showEditSize(id) {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/sizes/" + id,
    success: function (data) {
      console.log(data)
      let html =
        "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Edit</h2>" +
        "<form id='frm-size'>" +        
        '<div class="form-group row mt-4">\n' +
        '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="hidden" class="form-control" name="id" value=\'' +
        data?.id +"'>\n" +
        '      <input type="text" class="form-control" name="name" value=\'' +
        data?.name +"'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="age" class="col-sm-4 col-form-label"></label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="editSize(' + id + ')">Edit</button>' +
        "    </div>\n" +
        "  </div>\n" +
        "</form>" +
        "</div>";
        document.getElementById("content").innerHTML = html;
    },
  });
}
function editSize(id) {
  let formData = $("#frm-size").serializeArray();
  var jsonObj = {};
  $.map( formData, function( n, i ) {
     jsonObj[n.name] = n.value;
     jsonObj[n.name] = n.value;
  });
  console.log(jsonObj)
  $.ajax({
    type: "put",
    url: API + "/sizes",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    data: JSON.stringify(jsonObj),
    processData: false,
    contentType: "application/json;",
    success: loadSizeManagerContent,
    error: function (error) {
      console.log(error);
    },
  });
}
function deleteSize(id, name) {
  if (confirm("Do you want to delete " + name + "???")) {
     $.ajax({
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
             "Authorization": "Basic " + btoa(username + ":" + password)
         },
         type: 'Delete',
         url: API + '/sizes/' + id,
         success: loadSizeManagerContent,
         error: function (error) {
             console.log(error)
         }
     })
  }
}
function showAddFormSize() {
  let html =
    "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new Size" +
    "</h2>" +
    "<form id='frm-size'>" +
    '  <div class="form-group row mt-4">\n' +
    '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="name">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="row">\n' +
    '    <div class="offset-6 col-sm-2">\n' +
    '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="addSize()">Add</button>' +
    "    </div>\n" +
    "  </div>\n" +
    "</form>" +
    "</div>";
    document.getElementById("content").innerHTML = html;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadODerManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Order List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddFormOrder()">Add new Order</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">CustomerName</th>
                  <th scope="col">Price</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-order">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListOrder();
}

function loadListOrder() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/orders?size=100",
    success: function (data) {
      console.log(data.content)
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
                          <td>${i + 1}</td>
                          <td>${data.content[i].customerName}</td>
                          <td>${data.content[i].totalPrice}</td>
                          <td>${data.content[i].phone}</td>
                          <td>${data.content[i].address}</td>
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEditOrder('${data.content[i].id}')">Detail</button><Button class="btn btn-outline-danger" onclick="deleteOrder(${
                            data.content[i].id
                          },'${data.content[i].name}')">Del</Button></td></tr>`;
        }
      }
      document.getElementById("list-order").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function showEditOrder(id) {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/orders/" + id,
    success: function (data) {
      console.log(data)
      let html =
        "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Detail</h2>" +
        "<form id='product'>" +
        '  <div class="form-group row mt-4">\n' +
        '    <label for="name" class="col-sm-4 col-form-label">Customer Name</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Name" value=\'' +
        data?.customerName +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="age" class="col-sm-4 col-form-label">Email</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Email" value=\'' +
        data?.email +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Phone</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Phone" value=\'' +
        data?.phone +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Address</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Address" value=\'' +
        data?.address +
        "'>\n" +
        "    </div>\n" +
        "    </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Amount</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Address" value=\'' +
        data?.totalAmount +
        "'>\n" +
        "    </div>\n" +
        "    </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">price</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Address" value=\'' +
        data?.totalPrice +
        "'>\n" +
        "    </div>\n" +
        "    </div>\n" +
        '  <div class="form-group row">\n' +
        '    <div class="col-sm-12">\n' +  
        '     <table class="table table-striped table-bordered">' +
        '     <thread style="background-color: #04AA6D !important;">'+
          '     <tr>'+
          '       <th>Product Image</th>'+
          '       <th>Product Code</th>'+
          '       <th>Product name</th>'+
          '       <th>Product Price</th>'+
          '     </tr>'+
          '     </thread>'+
          '     <tbody id=product_detail>'+                  
        '       </tbody>'+
        '     </table>'+
        "    </div>\n" +
        "    </div>\n" +
        "</form>" +
        "</div>";
        document.getElementById("content").innerHTML = html;
        
        let htmlDetail ="";
        if(data?.orderDetails != null){
          for (let i = 0; i < data?.orderDetails.length; i++) {
            htmlDetail += `<tr>
                      <th>
                          <img src="${data?.orderDetails[i].product?.image}" alt="" style="width: 150px">
                      </th>
                      <td>${data?.orderDetails[i].product?.code}</td>
                      <td>${data?.orderDetails[i].product?.name}</td>
                      <td>${data?.orderDetails[i].product?.price}</td>
                    </tr>`;
          }
        }
        
        document.getElementById("product_detail").innerHTML = htmlDetail;
    },
  });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadFeedbackManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Feedback List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddFormFeedback()">Add new Feedback</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Content</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-feedback">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListFeedback();
}

function loadListFeedback() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/feedbacks?size=100",
    success: function (data) {
      console.log(data.content)
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
          html1 += `<tr>
                      <td>${i + 1}</td>
                      <td>${data.content[i].name}</td>
                      <td>${data.content[i].email}</td>
                      <td>${data.content[i].phone}</td>
                      <td>${data.content[i].content}</td>
                      <td><button class="btn btn-outline-secondary mr-2" onclick="showEditFeedback('${data.content[i].id}')">Detail</button><Button class="btn btn-outline-danger" onclick="deletFeeedback(${
                        data.content[i].id
                      },'${data.content[i].name}')">Del</Button></td></tr>`;
      }
      document.getElementById("list-feedback").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function showEditFeedback(id) {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/feedbacks/" + id,
    success: function (data) {
      console.log(data)
      let html =
        "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Detail</h2>" +
        "<form id='product'>" +
        '  <div class="form-group row mt-4">\n' +
        '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Name" value=\'' +
        data?.name +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="age" class="col-sm-4 col-form-label">Email</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Email" value=\'' +
        data?.email +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Phone</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Phone" value=\'' +
        data?.phone +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Address</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Address" value=\'' +
        data?.address +
        "'>\n" +
        "    </div>\n" +
        "  </div>\n" +
        '  <div class="form-group row">\n' +
        '    <label for="score" class="col-sm-4 col-form-label">Content</label>\n' +
        '    <div class="col-sm-8">\n' +
        '      <input type="text" class="form-control" name="Content" value=\'' +
        data?.content + 
        "'>\n" +
        "</form>" +
        "</div>";
        document.getElementById("content").innerHTML = html;
    },
  });
}


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadUserManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Users List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddFormUser()">Add new User</h4>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-user">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListUsers();
}

function loadListUsers() {
  $.ajax({
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    url: API + "/users?size=100",
    success: function (data) {
      console.log(data.content)
      let html1 = "";
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].state == true) {
          html1 += `<tr>
                          <td>${i + 1}</td>
                          <td>${data.content[i].name}</td>
                          <td>${data.content[i].email}</td>
                          <td>${data.content[i].phone}</td>
                          <td>${data.content[i].address}</td>
                          <td>
                          <Button class="btn btn-outline-danger" onclick="deletUser(${
                            data.content[i].id
                          },'${data.content[i].name}')">Del</Button></td></tr>`;
        }
      }
      document.getElementById("list-user").innerHTML = html1;
    },
    error: function (error) {
      console.log(error);
    },
  });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


function showAddForm(name) {
  let html =
    "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new " +
    name +
    "</h2>" +
    "<form id=" + name + ">" +
    '  <div class="form-group row mt-4">\n' +
    '    <label for="name" class="col-sm-4 col-form-label">Name</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" class="form-control" name="name">\n' +
    "    </div>\n" +
    "  </div>\n" +
    '  <div class="row">\n' +
    '    <div class="offset-6 col-sm-2">\n' +
    '       <button class="btn btn-outline-primary mt-2" type=\'button\' onclick="addCategory()">Add</button>' +
    "    </div>\n" +
    "  </div>\n" +
    "</form>" +
    "</div>";
    document.getElementById("content").innerHTML = html;
}
function loadFEEDBACkManagerContent() {
  let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >FEEDBACK</h2>
            <table class="table table-striped table-bordered">
              <thead style="background-color: #04AA6D !important;">
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`;
  document.getElementById("content").innerHTML = html;
  loadListSize();
}

//------------------------------------------------------------------------------------------------------------------------------//

// function loadListFeedback() {
//   $.ajax({
//     type: "GET",
//     headers: {
//       "Authorization": "Basic " + btoa(username + ":" + password)
//     },
//     url: "https:website-3h.herokuapp.com/admin/api/v1/feedbacks",
//     success: function (data) {
//       console.log(data);
//       let html1 = "";
//       for (let i = 0; i < data.content.length; i++) {
//         html1 += `<tr>
//                             <td>${i + 1}</td>
//                             <td>${data.content[i].name}</td>
//                             <td><Button class="btn btn-outline-danger" onclick="deleteSize(${
//                               data.content[i].id
//                             },'${
//           data.content[i].name
//         }')">Del</Button></td></tr>`;
//       }
//       document.getElementById("list-product").innerHTML = html1;
//     },
//     error: function (error) {
//       console.log(error);
//     },
//   });
// }
