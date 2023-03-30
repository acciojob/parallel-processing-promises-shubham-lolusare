

let opt = document.querySelector("#output");
let btn = document.querySelector("#download-images-button");

btn.addEventListener("click", () => {
  showImage(array);
});

async function showImage(array) {
  

  let arr = [];

	for(let x in array){
		arr.push(await fetch(array[x].url));
	}

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
