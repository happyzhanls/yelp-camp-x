var counter = 0;
function changeBG(){
  var imgs = [
    "url(https://images.unsplash.com/photo-1515408320194-59643816c5b2?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450",
    "url(https://images.unsplash.com/photo-1491439176760-28b4d8675a59?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450",
    "url(https://images.unsplash.com/photo-1495732140334-940c8108c072?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450",
    "url(https://images.unsplash.com/photo-1493804848645-846d916b7452?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450",
    "url(https://images.unsplash.com/photo-1499678329028-101435549a4e?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450",
    "url(https://images.unsplash.com/photo-1466495227171-d05d7e3ac2b3?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450",
    "url(https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450"
  ];
  if(counter === imgs.length) counter = 0;
  $("body").css("background-image", imgs[counter]);
  counter++;
}
setInterval(changeBG, 4000);

