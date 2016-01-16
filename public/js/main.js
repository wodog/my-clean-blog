$(function() {


    // $('.sidebar-menu li').on('click', function(e){
    //   $('.sidebar-menu li').removeClass('active');
    //   $(this).addClass('active');
    // });


    $('#posts table tbody tr').on('click', function(e) {
      $('#posts table tbody tr').removeClass('active');
      $(this).addClass('active');
    })

    $('#delete_btn').on('click', function(e) {

      var current_tr = $('#posts table tbody .active td');
      console.log($(current_tr[0]).text().trim());
      var data = {
        _id: $(current_tr[0]).text().trim()
      };


      $.ajax({
        method: 'POST',
        url: '/del',
        data: data,
        success: function(data){
          if(data.errCode ==0) {
            $('#posts table tbody .active').remove();
          }
        }
      });
    });


    $('#update_btn').on('click', function(e) {

        var current_tr = $('#posts table tbody .active td');
        var _id = $(current_tr[0]).text().trim()

        location.href='/write?_id=' + _id;

        // $.ajax({
        //   method: 'POST',
        //   url: '/write',
        //   data: data,
        //   success: function(data) {
        //     if(data.errCode == 0) {
        //
        //     }
        //   }
        // });
    });

});
