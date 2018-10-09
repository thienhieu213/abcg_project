
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/canvas-getsvg.js"></script> 
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/pencil.js"></script> 
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/lineWidth.js"></script> 
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/brush.js"></script> 
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/UndoRedo.js"></script>  
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/eraser.js"></script>   
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/colorTable.js"></script>     
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/paintOnline.js"></script>
    <script type="text/javascript" src = "mod/template_footer/views/default/resources/js/owl.carousel.min.js"></script>  
    <script>
        $(document).ready(function(){
            $('#forgot_button').click(function(){
               $('#signin-box').modal('hide');
               setTimeout(function(){
                $('#forgot-box').modal('show');
               }, 500);
            })
        });
    </script>
    </body>
</html>