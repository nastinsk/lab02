'use strict';

let options = [];

//constructor function for creating images object instances
function ImgGallery(img) {
  this.imageUrl = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;

  ImgGallery.allImages.push(this);
  ImgGallery.allImagesNew.push(this);
  ImgGallery.allImagesNewTitles.push(this);

}
//array that will store all img objects from json file
//it wil be our back up array
ImgGallery.allImages = [];

//they will be our arrays where our values will be sorted
ImgGallery.allImagesNew = [];
ImgGallery.allImagesNewTitles = [];

//method to render imgs in sections to the DOM
ImgGallery.prototype.render = function(){
  $('main').append('<section class = "clone"></section>');
  let imgClone = $('section[class="clone"]');

  imgClone.append('<h2></h2>', '<img>', '<p>');

  imgClone.find('h2').text(this.title);
  imgClone.find('img').attr('src', this.imageUrl).attr('alt', this.description).attr('title', this.title);
  imgClone.find('p').html(`${this.description} </br> Amount of Horns: ${this.horns}`);
  imgClone.removeClass('clone');
  imgClone.attr('class', this.keyword);
};

//function to take data from page-1.json
ImgGallery.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      //creating new object instances with data from json file
      data.forEach(item => {
        new ImgGallery(item);
      });

      //pushing unique keywords to options array
      options.push(ImgGallery.allImages[0].keyword);
      ImgGallery.allImages.forEach(function(item){
        if(options.includes(item.keyword) === false){
          options.push(item.keyword);
        }
      });
      //append options.array to the dropdown list
      options.forEach(function(element){
        $('#keywordForm').append(`<option value = ${element}>${element}</option>`);
      });

    })
    .then(ImgGallery.loadImg);
};
//load all images to gallery
ImgGallery.loadImg = () => {
  ImgGallery.allImages.forEach(img => img.render());

};

$(() => ImgGallery.readJson());

//function to filter images by keyword
$('#keywordForm').on('change', function() {
  let selection = $(this).val();

  if(selection === 'default'){
    $('section').show();
  }

  else{
    $('section').hide();
    $(`section[class="${selection}"]`).show();
  }
});


//helper function
function swap(array, i, j){
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

//helper function to rearrange sections on the page
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




