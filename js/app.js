'use strict';

let options = [];

function ImgGallery(img) {
  this.imageUrl = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}
ImgGallery.allImages = [];

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
}

ImgGallery.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        ImgGallery.allImages.push(new ImgGallery(item));
      });
      
      options.push(ImgGallery.allImages[0].keyword);
      ImgGallery.allImages.forEach(function(item, i, arr){
        if(options.includes(item.keyword) === false){
          options.push(item.keyword);
        }
      })
    })
  .then(ImgGallery.loadImg);
};

ImgGallery.loadImg = () => {
  ImgGallery.allImages.forEach(img => img.render());
  $('#photo-template').remove();
};

$(() => ImgGallery.readJson());








