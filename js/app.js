'use strict';

let options = [];

//constructor function for creating images object instances
function ImgGallery(img) {
  this.imageUrl = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}
//array that will store all img objects from json file
ImgGallery.allImages = [];

//method to render imgs in sections to the DOM
ImgGallery.prototype.render = function(){
  $('main').append('<section class = "clone"></section>');
  let imgClone = $('section[class="clone"]');

  let photoHtml = $('#photo-template').html();

  imgClone.html(photoHtml);

  imgClone.find('h2').text(this.title);
  imgClone.find('img').attr('src', this.imageUrl).attr('alt', this.description).attr('title', this.title);
  imgClone.find('p').text(this.description);
  imgClone.removeClass('clone');
  imgClone.attr('class', this.keyword);
};

//function to take data from page-1.json
ImgGallery.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      //creating new object instances with data from json file
      data.forEach(item => {
        ImgGallery.allImages.push(new ImgGallery(item));
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
        $('select').append(`<option value = ${element}>${element}</option>`);
      });

    })
    .then(ImgGallery.loadImg);
};
//load all images to gallery
ImgGallery.loadImg = () => {
  ImgGallery.allImages.forEach(img => img.render());
  $('#photo-template').remove();
};

$(() => ImgGallery.readJson());

//function to filter images by keyword
$('select').on('change', function() {
  let selection = $(this).val();
  if(selection === "default"){
    $('section').show();
  } else{
    $('section').hide();
    $(`section[class="${selection}"]`).show();
  }
});




