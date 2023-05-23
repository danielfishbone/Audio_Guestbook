$(document).ready(function() {
    $('#colorpicker').spectrum({
    color: "#4cd74c",
      showInitial: true,
      preferredFormat: "hex",
      showInput: true,
      showPalette: true,
      palette: [
        ["red", "orange", "yellow", "green", "blue", "purple"]
      ]
    });
});