let openBtn = () => {
    console.log("open");
  let sideBar = document.querySelector("nav .nav2 ");
  sideBar.style.display = "flex";
  document.body.style.overflowY = "hidden";
};

let closeBtn = () => {
  if (window.innerWidth <= 640) {
    let sideBar = document.querySelector("nav .nav2 ");
    sideBar.style.display = "none";
    document.body.style.overflowY = "auto";
  }
};

let showCategoriesList = () => {
  console.log("clicked");
  let catList = document.querySelector(".category .categoriesList");
  
    if(catList.style.display=="inline"){
        catList.style.display="none"
    }else{
        catList.style.display="inline";
    }
};
