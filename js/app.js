'use strict';

function ImgGallery(img) {
  this.imageUrl = img.image_url;
  this.title = img.title;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}
ImgGallery.allImages = [];
console.log(ImgGallery.allImages);

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
    })
    .then(ImgGallery.loadImg);
};

ImgGallery.loadImg = () => {
  ImgGallery.allImages.forEach(img => img.render());
  $('#photo-template').remove();
};

$(() => ImgGallery.readJson());



/* Event Listener for Form */

let options = [];
ImgGallery.allImages.forEach(element,index => {
    options.push(ImgGallery.allImages[index].keyword);



    // for(let i = 0; i < ImgGallery.allImages.length; i++){
        
    //     if (options[i] === ImgGallery.allImages.keyword){
    //         break;
    //     } else{
    //         options.push(ImgGallery.allImages.keyword);
    //     }
    // }
    // $('select').append('option')
});

console.log(options);

// forEach ImageGallery.allImages
// if option does not exist then
    // create new form option

// add event listener for select option
// add event handler that hides images without keyword





