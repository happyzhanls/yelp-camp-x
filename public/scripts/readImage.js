function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#imageShow').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$("#b").change(function() {
  readURL(this);
});