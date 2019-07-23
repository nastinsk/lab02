'use strict';

// let options = [];
// let options2 = [];

// let page2Arr = [];

// //constructor function for creating images object instances
// function ImgGallery(img) {
//   this.imageUrl = img.image_url;
//   this.title = img.title;
//   this.description = img.description;
//   this.keyword = img.keyword;
//   this.horns = img.horns;

//   ImgGallery.allImages.push(this);
//   ImgGallery.allImagesNew.push(this);
//   ImgGallery.allImagesNewTitles.push(this);

// }
// //array that will store all img objects from json file
// //it wil be our back up array
// // ImgGallery.allImages = [];

// // they will be our arrays where our values will be sorted
// ImgGallery.allImagesNew = [];
// ImgGallery.allImagesNewTitles = [];

// // //method to render imgs in sections to the DOM
// // ImgGallery.prototype.render = function(){
// //   $('#page1').append('<section class = "clone"></section>');
// //   let imgClone = $('section[class="clone"]');

// //   imgClone.append('<h2></h2>', '<img>', '<p>');

// //   imgClone.find('h2').text(this.title);
// //   imgClone.find('img').attr('src', this.imageUrl).attr('alt', this.description).attr('title', this.title);
// //   imgClone.find('p').html(`${this.description} </br> Amount of Horns: ${this.horns}`);
// //   imgClone.removeClass('clone');
// //   imgClone.attr('class', this.keyword);
// // };

// 



///////////Stretch goal //////////////

//helper function
function swap(array, i, j){
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

//helper function to rearrange sections on the page
// adapted from http://blog.benoitvallon.com with Ahren Swett and Yang Song help
const sortingFunction = (arr, word) => {
  for(let i = 0; i < arr.length; i++) {
    let min = i;
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[j][word] < arr[min][word]) {
        min = j;
      }
    }

    if(i !== min) {
      swap(arr, i, min);
    }
  }
};


$('#sortByForm').on('change', function() {
  let selection = $(this).val();

  if(selection === 'default'){
    $('section').remove();
    ImgGallery.allImages.forEach(item => item.render());
  }

  if (selection === 'byHorns') {
    $('section').remove();

    sortingFunction(ImgGallery.allImagesNew, 'horns');

    //render renewed allImages array on page
    ImgGallery.allImagesNew.forEach(item => item.render());
  }

  if(selection === 'byTitle'){
    $('section').remove();

    sortingFunction(ImgGallery.allImagesNewTitles, 'title');

    //render renewed allImages array on page
    ImgGallery.allImagesNewTitles.forEach(item => item.render());
  }

});
