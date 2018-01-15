var counter = 0;
function changeBG(){
  var imgs = [
    "url(https://images.unsplash.com/photo-1515408320194-59643816c5b2?auto=format&fit=crop&w=1050&q=80)",
    "url(https://images.unsplash.com/photo-1491439176760-28b4d8675a59?auto=format&fit=crop&w=1050&q=80)",
    "url(https://images.unsplash.com/photo-1495732140334-940c8108c072?auto=format&fit=crop&w=1050&q=80)",
    "url(https://images.unsplash.com/photo-1493804848645-846d916b7452?auto=format&fit=crop&w=1050&q=80)",
    "url(https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1050&q=80)",
    "url(https://images.unsplash.com/photo-1466495227171-d05d7e3ac2b3?auto=format&fit=crop&w=1050&q=80)",
    "url(https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?auto=format&fit=crop&w=1052&q=80)"
  ];
  if(counter === imgs.length) counter = 0;
  $("body").css("background-image", imgs[counter]);
  counter++;
}
setInterval(changeBG, 2000);

