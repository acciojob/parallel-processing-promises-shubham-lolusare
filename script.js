let array = [
  {
    url: "https://cdn.shopify.com/s/files/1/0592/6141/9682/files/09.04.2022_web.jpg?v=1649517840",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0592/6141/9682/files/20.04.2021_web.jpg?v=1632139259",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0592/6141/9682/files/01.04.2020_webb.jpg?v=1632139259",
  },
];

let opt = document.querySelector("#output");
let btn = document.querySelector("#download-images-button");

btn.addEventListener("click", () => {
  showImage(array);
});

async function showImage(array) {
  let p1 = fetch(array[0].url);
  let p2 = fetch(array[1].url);
  let p3 = fetch(array[2].url);

  let arr = [p1, p2, p3];

  Promise.all(arr)
    .then(async (data) => {
      let arr2 = [];

      for (let x of data) {
        arr2.push(URL.createObjectURL(await x.blob()));
      }

      return arr2;
    },(error)=>{alert(`Failed to load image's URL: ${error}`)})
    .then((data) => {
      for (let x of data) {
        let image = document.createElement("img");
        image.src = x;
        image.style.cssText =
          "width:400px;height:400px;display:block;margin:10px";
        opt.append(image);
      }
    });
}
