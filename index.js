// menu toggle
function navSlide() {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav-links");

  burger.addEventListener("click", function () {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });
}
navSlide();
// image-slider
$(document).ready(function () {
  $(".banner-slider").slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 800,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
// let dots = 4;
// let sliderElem = document.querySelector(".banner");
// let dotElems = sliderElem.querySelectorAll(".slider__dot");
// let indicatorElem = sliderElem.querySelector(".slider__indicator");

// Array.prototype.forEach.call(dotElems, (dotElem) => {
//   dotElem.addEventListener("click", (e) => {
//     let currentPos = parseInt(sliderElem.getAttribute("data-pos"));
//     let newPos = parseInt(dotElem.getAttribute("data-pos"));

//     let newDirection = newPos > currentPos ? "left" : "right";
//     let currentDirection = newPos < currentPos ? "right" : "left";

//     indicatorElem.classList.remove(`slider__indicator--${currentDirection}`);
//     indicatorElem.classList.add(`slider__indicator--${newDirection}`);
//     sliderElem.setAttribute("data-pos", newPos);
//   });
// });
// Selection of the elements
var clothingCards = document.getElementById("clothingCards");
var accessoriesCards = document.getElementById("accessoriesCards");

// Create Card Function That Create Card Dynamically
function createItemCard(id, preview, name, brand, price) {
  //Create a DIV element with class CARD
  var cardElement = document.createElement("div");
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", id);

  //Create a ANCHOR element with HREF
  var cardLink = document.createElement("a");
  cardLink.href = "product.html?product_id=" + id;

  //Create a IMG-CONTAINER element with class IMG
  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img");

  //Create a IMG element with SRC
  var newImgElement = document.createElement("img");
  newImgElement.src = preview;

  // Append IMG into IMG-CONTAINER
  imgContainer.appendChild(newImgElement);

  //Create a DIV element with class DETAILS
  var deatils = document.createElement("div");
  deatils.setAttribute("class", "details");

  //Create a H3 element with TEXT-NODE NAME
  var newTitleElement = document.createElement("h3");
  var newName = document.createTextNode(name);

  // Append NAME into H3
  newTitleElement.appendChild(newName);
  deatils.appendChild(newTitleElement);

  //Create a H4 element with TEXT-NODE BRAND
  var newBrandElement = document.createElement("h4");
  var newBrand = document.createTextNode(brand);

  // Append BRAND into H4
  newBrandElement.appendChild(newBrand);
  deatils.appendChild(newBrandElement);

  //Create a H5 element with TEXT-NODE PRICE
  var newPriceElement = document.createElement("h5");
  var newPriceText = document.createTextNode("Rs ");
  var newPrice = document.createTextNode(price);
  newPriceElement.appendChild(newPriceText);

  // Append PRICE into H5
  newPriceElement.appendChild(newPrice);
  deatils.appendChild(newPriceElement);

  // Append IMG-CONATINER into CARD-LINK
  cardLink.appendChild(imgContainer);
  cardLink.appendChild(deatils);

  // Append CARD-LINK into CARD-ELEMENT
  cardElement.appendChild(cardLink);

  // Returning CARD-ELEMENT
  return cardElement;
}

// ---------------- Request Data & Create Cards On Home Page -------

function getCardsData() {
  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (data) {
    var responseData = data;
    for (var i = 0; i < responseData.length; i++) {
      if (responseData[i].isAccessory === false) {
        clothingCards &&
          clothingCards.append(
            createItemCard(
              responseData[i].id,
              responseData[i].preview,
              responseData[i].name,
              responseData[i].brand,
              responseData[i].price
            )
          );
      } else {
        accessoriesCards &&
          accessoriesCards.append(
            createItemCard(
              responseData[i].id,
              responseData[i].preview,
              responseData[i].name,
              responseData[i].brand,
              responseData[i].price
            )
          );
      }
    }
  });
}
getCardsData();

// ---------------- Request Data On Card Click To Display Product Page -------

function getProductDetail() {
  // Get Product Id From URL
  var searchId = window.location.search.split("=")[1];
  console.log("searchId", searchId);

  // Get Product Details
  $.get(
    `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${searchId}`,

    function (data) {
      var productDetail = data;
      name = productDetail.name;
      imageSrc = productDetail.preview;
      brand = productDetail.brand;
      price = productDetail.price;
      description = productDetail.description;
      photo0 = productDetail.photos[0];
      photo1 = productDetail.photos[1];
      photo2 = productDetail.photos[2];
      photo3 = productDetail.photos[3];
      photo4 = productDetail.photos[4];
      photo5 = productDetail.photos[5];

      createProductPage(
        imageSrc,
        name,
        brand,
        price,
        description,
        photo0,
        photo1,
        photo2,
        photo3,
        photo4,
        photo5
      );
    }
  );
}
getProductDetail();

// ---------------- Create Product Page i.e Inserting Information -------

function createProductPage(
  imageSrc,
  name,
  brand,
  price,
  description,
  images0,
  images1,
  images2,
  images3,
  images4,
  images5
) {
  var productpagemain = document.getElementById("product-page-main");
  const section = document.createElement("section");
  section.setAttribute("id", "product");
  productpagemain.appendChild(section);

  const leftColumn = document.createElement("div");
  leftColumn.setAttribute("class", "left-column");
  section.appendChild(leftColumn);

  const productimage = document.createElement("img");
  productimage.setAttribute("id", "productImg");
  leftColumn.appendChild(productimage);
  productimage.src = imageSrc;

  // for right side
  const rightColumn = document.createElement("div");
  rightColumn.setAttribute("class", "right-column");
  section.appendChild(rightColumn);

  const productDescription = document.createElement("div");
  productDescription.setAttribute("class", "product-description");
  rightColumn.appendChild(productDescription);

  const h4 = document.createElement("h4");
  const h3 = document.createElement("h3");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");

  h1.setAttribute("id", "name");
  productDescription.appendChild(h1);
  h1.innerHTML = name;
  h3.setAttribute("id", "brand");
  productDescription.appendChild(h3);
  h3.innerHTML = brand;

  const pricetext = document.createElement("div");
  h4.setAttribute("id", "price");
  productDescription.appendChild(h4);
  h4.innerHTML = `Price: Rs   <span>${price}<span/>`;
  // h4.innerText="Price: Rs  "+  data.price
  // h4.innerText= data.price;

  const descriptionwheading = document.createElement("div");
  productDescription.appendChild(h3);
  h3.innerText = "Description";

  p.setAttribute("id", "description");
  productDescription.appendChild(p);
  p.innerHTML = description;

  // product review box
  const productPreview = document.createElement("div");
  productPreview.setAttribute("class", "product-preview");
  productDescription.appendChild(productPreview);

  const productreviewheading = document.createElement("h3");
  productPreview.appendChild(productreviewheading);
  productreviewheading.innerHTML = "Product Preview";

  const productpreview = document.createElement("div");
  productpreview.setAttribute("class", "previewImg");
  productPreview.appendChild(productpreview);
  //   const btnpreview = document.createElement("div");
  //   btnpreview.innerHTML = `<div class="btn">
  // <button id="add-to-cart">Add to cart</button>
  // </div>`;
  //   productPreview.appendChild(btnpreview);

  //5 image
  const img1 = document.createElement("img");
  img1.setAttribute("id", "img1");
  img1.setAttribute("class", "active");
  productpreview.appendChild(img1);
  img1.src = images0;

  const img2 = document.createElement("img");
  img2.setAttribute("id", "img2");
  productpreview.appendChild(img2);
  img2.src = images1;

  const img3 = document.createElement("img");
  img3.setAttribute("id", "img3");
  productpreview.appendChild(img3);
  img3.src = images2;

  const img4 = document.createElement("img");
  img4.setAttribute("id", "img4");
  productpreview.appendChild(img4);
  img4.src = images3;

  const img5 = document.createElement("img");
  img5.setAttribute("id", "img5");
  productpreview.appendChild(img5);
  img5.src = images4;

  // ---------------- Change Preview Image OnClick -------
  function changeImage() {
    // Photo 0
    img1.addEventListener("click", function () {
      productimage.src = images0;
      myFunction(event);
    });

    // Photo 1
    img2.addEventListener("click", function () {
      productimage.src = images1;
      myFunction(event);
    });
    // Photo 2
    img3.addEventListener("click", function () {
      productimage.src = images2;
      myFunction(event);
    });

    // Photo 3
    img4.addEventListener("click", function () {
      productimage.src = images3;
      myFunction(event);
    });

    // Photo 4
    img5.addEventListener("click", function () {
      productimage.src = images4;
      myFunction(event);
    });
  }
  changeImage();

  // // Toggle Active Class
  function myFunction(e) {
    if (document.querySelector(".previewImg img.active") !== null) {
      document
        .querySelector(".previewImg img.active")
        .classList.remove("active");
    }
    e.target.className = "active";
  }
  // ---------------- Change Preview Image OnClick -------
}
// product detail html

$(document).on("click", ".previewImg img", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

// ---------------- Insert Data into Local Storage > OnClick > Add To Cart Button -------

var addToCartBtn = document.getElementById("add-to-cart");
var cart = document.getElementById("cart-count");
var myCartData = [];
var cartIntialValue;

if (localStorage.getItem("cart-count") == null) {
  localStorage.setItem("cart-count", "0");
} else {
  var cartValue = localStorage.getItem("cart-count");
  localStorage.setItem("cart-count", cartValue);
}

// ---------------- Increase Cart Count -----------------------
function cartCount() {
  if (window.localStorage.getItem("cart-count") === null) {
    cartIntialValue = 0;
  } else {
    cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
    cart.innerHTML = cartIntialValue;
  }
  var cartCurrentValue = cartIntialValue + 1;
  window.localStorage.setItem("cart-count", cartCurrentValue);
  cart.innerHTML = window.localStorage.getItem("cart-count");
}
cart.innerHTML = window.localStorage.getItem("cart-count");

// ---------------- Add Data into List and then into Local Storage -----------------------

function addDataIntoList(productData) {
  // If Local Storage Is Empty Then Set List To Empty
  if (window.localStorage.getItem("product-list") === null) {
    myCartData = [];
  }
  // If Local Storage Is Not Empty Then Set List To Value Of Local Storage
  else {
    myCartData = JSON.parse(window.localStorage.getItem("product-list"));
  }

  // If List Is Empty Then Push The Object In It
  if (myCartData.length === 0) {
    var myObj = {
      id: productData.id,
      title: productData.name,
      count: 1,
      price: productData.price,
      preview: productData.preview,
    };
    myCartData.push(myObj);
  }
  // If List Is Not Empty Then
  else if (myCartData.length != 0) {
    var w = 0;
    // If Same Product Data == True Then List.Count++
    for (var i = 0; i < myCartData.length; i++) {
      if (myCartData[i].id == productData.id) {
        myCartData[i].count = parseInt(myCartData[i].count) + 1;
        w += 1;
      }
    }
    // Else Add New Data Into List
    if (w == 0) {
      var myObj = {
        id: productData.id,
        title: productData.name,
        count: 1,
        price: productData.price,
        preview: productData.preview,
      };
      myCartData.push(myObj);
    }
  }
  // Store The List Into Local Storage
  window.localStorage.setItem("product-list", JSON.stringify(myCartData));
}

//------ Add-To-Cart-Btn Click Event Listner ------------------------

// Get Product Details
addToCartBtn.addEventListener("click", function () {
  var productId = window.location.search.split("=")[1];
  var urlLink =
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;

  function getDataForLocalStorage() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var productData = JSON.parse(this.responseText);
          addDataIntoList(productData);
        }
      }
    };
    http.open("GET", urlLink, true);
    http.send();
  }
  cartCount();
  getDataForLocalStorage();
});
//--------------------------------------------------------
