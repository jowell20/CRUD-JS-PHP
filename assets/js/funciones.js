$(function(){
agregarEmpleado();
listarEmpleados();
eliminarEmpleado();
editar();
actualizar();
$("#updateempleado").hide();
$("#addempleado").show();

})

function listarEmpleados(){
    
       $.ajax({
        url:'/proyectos/empleados/controller/usuarioController.php',
        type:'GET',
        processData:false,
        success: function(response){
                   (response);
           var plantilla = ""
          const personas = JSON.parse(response)
          
                personas.forEach(persona=>
            {
                plantilla+=`
                <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
               <td>${persona.apellido}</td>
                <td>${persona.cedula}</td>
               <td>${persona.correo}</td>
                <td>${persona.telefono}</td>
                <td><button type="button" class="editar btn btn-primary">editar</button></td>
                <td><button id="" type="button" class="eliminar btn btn-danger">eliminar</button></td>
              </tr>`
            })
                $("#tablausuarios").html(plantilla) 
        }
    }
    )
}
    function agregarEmpleado(){
        $("#addempleado").click(function(e){
            e.preventDefault()
     
            var nombre = $("#nombre").val();
            var apellido =$("#apellido").val();
            var cedula =$("#cedula").val();
            var correo =$("#correo").val();
            var telefono =$("#telefono").val();

            if(nombre === "" || apellido === "" || cedula=== "" || correo === "" || telefono ===""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'todos los campos son obligatorios',
                    
                  })
            }else{
                Swal.fire({
                    title: 'Desea guardar empleado?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'guardar',
                    denyButtonText: `no guardar`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        var datos = {
                            nombre:nombre,
                            apellido:apellido,
                            cedula:cedula,
                            correo:correo,
                            telefono:telefono
                        }
                       
                        console.log(datos.nombre);
                        console.log(datos.cedula);
                        $.post('/proyectos/empleados/controller/usuarioController.php',datos , function(response){
                            
                            $("#nombre").val("")
                            $("#apellido").val("")
                            $("#cedula").val("")
                            $("#correo").val("")
                            $("#telefono").val("")
                          listarEmpleados();
                          
                        })
                      Swal.fire('Empleado guardado', '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Empleado no guardado', '', 'info')
                    }
                  })
               
            }
        })
 }
 function eliminarEmpleado(){
    $("#tablausuarios").on('click','.eliminar',function(e){
        Swal.fire({
            title: 'estas seguro de eliminar el empleado?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'eliminar',
            denyButtonText: `no eliminar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('empleado eliminado', '', 'success')
              var id=$(this).closest('tr').find('td:eq(0)').text();
              var datos ={
                 id:id
              }
     
              $.post('/proyectos/empleados/controller/usuarioController.php',datos,function(response){
                 listarEmpleados();
                 
              })
            } else if (result.isDenied) {
              Swal.fire('cambios no guardados', '', 'info')
            }
          })
       

    })

 }
 function editar(){
    $("#tablausuarios").on('click','.editar',function(e){
       e.preventDefault()
       $("#updateempleado").show();
       $("#addempleado").hide();
        var id = $(this).closest('tr').find('td:eq(0)').text();
        var nombre = $(this).closest('tr').find('td:eq(1)').text();
        var apellido = $(this).closest('tr').find('td:eq(2)').text();
        var cedula = $(this).closest('tr').find('td:eq(3)').text();
        var correo = $(this).closest('tr').find('td:eq(4)').text();
        var telefono = $(this).closest('tr').find('td:eq(5)').text();
        $('#id').val(id);
        $('#nombre').val(nombre);
        $('#apellido').val(apellido);
        $('#cedula').val(cedula);
        $('#correo').val(correo);
        $('#telefono').val(telefono);
        

    })
 }
 function actualizar(){
    $('#updateempleado').click(function(e){
        e.preventDefault()
        $("#addempleado").hide();
        var idP = $('#id').val();
        var nombreP = $('#nombre').val();
        var apellido = $('#apellido').val();
        var cedula = $('#cedula').val();
        var correo = $('#correo').val();
        var telefono = $('#telefono').val();
        if(nombreP ==="" || apellido ==="" || cedula==="" || correo ==="" || telefono ==="" ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'todos los campos son obligatorios',
                
              })
              $("#addempleado").hide();
        }else{
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton:false,
                confirmButtonText: 'Actulizar?',
                denyButtonText: `No Actualizar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var datos ={
                        idP:idP,
                        nombreP:nombreP,
                        apellido:apellido,
                        cedula:cedula,
                        correo:correo,
                        telefono:telefono,
                        }
                        $("#updateempleado").hide();
                        $("#addeempleado").show();
                       
                       $.post('/proyectos/empleados/controller/usuarioController.php',datos,function(response){
                              $("#id").val("")
                     $("#nombre").val("")
                     $("#apellido").val("")
                     $("#cedula").val("")
                     $("#correo").val("")
                     $("#telefono").val("")
                     $("#addempleado").show();
                            listarEmpleados();
                        }); 
                       
                  Swal.fire('Actualizado!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('cambios no guardados', '', 'info')
                  $("#updateempleado").hide();
                  $("#id").val("")
                  $("#nombre").val("")
                  $("#apellido").val("")
                  $("#cedula").val("")
                  $("#correo").val("")
                  $("#telefono").val("")
                  $("#addempleado").show();
                }
              })
            
                
        }
    } )
 }