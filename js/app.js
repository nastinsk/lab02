'use strict';

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

    imgClone.find('h2').text(this.keyword);
    imgClone.find('img').attr('src', this.imageUrl).attr('alt', this.keyword).attr('title', this.title);
    imgClone.find('p').text(this.description);
    imgClone.removeClass('clone');
    imgClone.attr('class', this.keyword);
}

ImgGallery.readJson = () => {
    $.get('page-1.json', 'json')
    .then(data => {
        data.forEach(item => {
                ImgGallery.allImages.push(new ImgGallery(item));
        });
    })
    .then(ImgGallery.loadImg);
};

ImgGallery.loadImg = () => {
    ImgGallery.allImages.forEach(img => img.render());
}

$(() => ImgGallery.readJson());
