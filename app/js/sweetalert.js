
module.exports = function sweetAlert() {
      //do something to alert user and prompt them
      //possibly confirm('You are on deck to sing.  Press ok to confirm')
      SweetAlert.swal({
        title: "Ready?",
        text: "You are next in queue!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "$color-theme",confirmButtonText: "Yes, I'm ready!",
        cancelButtonText: "No, chicken out!",
        timer: 60000,
        closeOnConfirm: false,
        closeOnCancel: false },
        function(isConfirm){
          if (isConfirm) {
            SweetAlert.swal("Confirmed!", "You are next!", "success");
            socket.emit('onDeck', function () {
              $location.url('/menu');
            });
          } else {
            SweetAlert.swal("Cancelled", "You have been pushed back in queue", "error");
            $location.url('/queue');
          }
      });
    };
