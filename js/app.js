'use strict';

let options = [];
let options2 = [];

let page2Arr = [];
let page2ArrNew = [];
let page2ArrNewTitles = [];

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
  $('#page1').append('<section class = "clone"></section>');
  let imgClone = $('section[class="clone"]');

  imgClone.append('<h2></h2>', '<img>', '<p>');

  imgClone.find('h2').text(this.title);
  imgClone.find('img').attr('src', this.imageUrl).attr('alt', this.description).attr('title', this.title);
  imgClone.find('p').html(`${this.description} </br> Amount of Horns: ${this.horns}`);
  imgClone.removeClass('clone');
  imgClone.attr('class', this.keyword);
};

//function to take data from page-1.json
ImgGallery.readJson = (page => {
  $.get(`data/${page}.json`, 'json')
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
        $('#keywordForm').append(`<option class ="one" value = ${element}>${element}</option>`);
      });

      options2.push(page2Arr[0].keyword);
      page2Arr.forEach(function(item){
        if (options2.includes(item.keyword) === false){
          options2.push(item.keyword);
        }
      });
      options2.forEach(function(element){
        $('#keywordForm').append(`<option class = "two" value = ${element}>${element}</option>`);
        $('.two').hide();
      });
    })
    .then(ImgGallery.loadImg);
});
//load all images to gallery
ImgGallery.loadImg = () => {
  ImgGallery.allImages.forEach(img => img.render());

};

$(() => ImgGallery.readJson('page-1'));
// $(() => ImgGallery.readJson('page-2'));

//////////Second Feature//////////////

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

// page2Arr = [];
// let page2ArrNew = [];
// let page2ArrNewTitles = [];

$('#sortByForm').on('change', function() {
  let selection = $(this).val();

  if(selection === 'default'){
    $('section').remove();

    ImgGallery.allImages.forEach(item => item.render());
    page2Arr.forEach(newPage => {
      $('#page2').append(newPage.toHtml());
      $('#page2').hide();
    });
    
  }

  if (selection === 'byHorns') {
    $('section').remove();

    // sortingFunction(ImgGallery.allImagesNew, 'horns');
    // sortingFunction(ImgGallery)

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


/* got solution from here: https://stackoverflow.com/questions/16991341/json-parse-file-path */

var request = new XMLHttpRequest();
request.open('GET','data/page-2.json', false);
request.send(null);
var jsonData = JSON.parse(request.responseText);
// console.log(jsonData);

/* solution end */


function ImgGallery2 (rawData){
  for(let key in rawData){
    this[key] = rawData[key];

    page2Arr.push(this);
    page2ArrNew.push(this);
    page2ArrNewTitles.push(this);

  }
}

ImgGallery2.prototype.toHtml = function(){
  let template = $('#template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);

};

jsonData.forEach(jsonObject => {
  new ImgGallery2(jsonObject);
});

page2Arr.forEach(newPage => {
  $('#page2').append(newPage.toHtml());
  $('#page2').hide();
});

console.log(page2Arr);

$('button[value = page2Button]').on('click', function(){
  $('#page2').show();
  $('#page1').hide();
  $('.one').hide();
  $('.two').show();
});

$('button[value = page1Button]').on('click', function(){
  $('#page1').show();
  $('#page2').hide();
  $('.two').hide();
  $('.one').show();
});





