let updateRow;

$(document).on('submit', 'form',  function(e){
    e.preventDefault();

    let form = $(this);

    let data = new FormData($(this)[0]);

    let type = $(this).attr('method');

    let url = $(this).attr('action');

    $.ajax({
        url,
        type,
        data,
        dataType:'json',
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res)

            res.swal && Swal.fire(res.swal);
            res.formReset && (form.trigger('reset'));
            res.modalHide && $(res.modalHide).modal('hide');
            // res.addRowTable && $(res.addRowTable).append(res.row);

            

            switch(res.addRowTable){
                case '#users-table tbody':
                    userRow(res.user, res.addRowTable)
                    break;
            }

            switch(res.updateRowTable){
                case '#users-table tbody':
                    userRowUpdate(res.user, res.updateRowTable)
                    break;
            }
        },
        error:function(){
            console.log('AJAX ERROR');
        }
    })
});

function userRow(user, table){
    let row = `<tr id='row-${user.id}'><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td><td>
                            <i data-url='user?id=${user.id}' class="bi bi-pencil text-info edit"></i>
                            <i data-url='user?id=${user.id}' class="bi bi-trash3 text-danger delete-row"></i>
                          </td></tr>`;
    $(table).append(row);
}

function userRowUpdate(user, table){
    let row = `<td  id='row-${user.id}'>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td><td>
                            <i data-url='user?id=${user.id}' class="bi bi-pencil text-info edit"></i>
                            <i data-url='user?id=${user.id}' class="bi bi-trash3 text-danger delete-row"></i>
                          </td>`;

    $(`${table} #row-${user.id}`).html(row);
    $(table + ' #row-' + user.id).html(row);
}



$(document).on('click','.delete-row',function(){
    let row = $(this);
    let url = 'api/delete/' + $(this).data('url'); // data-id='123'
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url,
                dataType:'json',
                success:function(res){
                    res.swal && Swal.fire(res.swal);
                    res.deleteRowTable && (row.parents('tr').remove())
                }
            });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
})


$(document).on('click', '.edit', function(){
    updateRow = $(this);
    let url = '/api/read/' + $(this).data('url');
    $.ajax({
        url,
        dataType:'json',
        success:function(res){
            if(res.modalShow){
                for (let [key, value] of Object.entries(res.formFieldValues)) {
                    $(`[name="${key}"]`).val(value);
                }

                $(res.modalShow).find('.modal-title span').text('Update')
                $(res.modalShow).modal('show');
                $(res.modalShow).find('form').attr('action', '/api/update/' + res.updateUrl);
            }
        },
        error:function(){
            console.log('error in ajax');
        }
    })
})


$(document).on('click','.create-modal', function(){
    let target = $(this).data('bs-target')
    let formAction = '/api/create/' + $(this).data('url'); 
    $(target).find('.modal-title span').text('Create');
    $(target).find('form').attr('action', formAction);
    $(target + ' input').val('');
});
$('#loginForm').submit(function(e) {
    e.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val(); 
    let url = $(this).attr('action');

    $.ajax({
        url: 'api/read/login',  // Your server endpoint
        type: 'POST',
        data: {
            username: username,
            password: password,
        },
        success:function async(res){
            // console.log(res)

           res.swal && Swal.fire(res.swal).then;
            if(res.redirect) {
    
                window.location.href =res.redirect; // Redirect to /users page
            }else{
                console.log(res)
            }


        },



    })


})