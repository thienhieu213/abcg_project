
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
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

            $('#tools').draggable();
            $('#artLibraryTemplate').css('width',$(window).width() * 0.9 + 49);
            /*************** Carousel for art Library Template *********************/
            $('#library-owl-carousel').owlCarousel({
                loop:true,
                margin:0,
                nav:false,
                dots:false,
                responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:2
                    },
                    700:{
                        items:3
                    },
                    900:{
                        items:4
                    },
                    1024:{
                        items:7
                    },
                    1300:{
                        items:8
                    }
                }
            })
            // Go to the next item
            $('#right-btn').click(function() {
                $('#library-owl-carousel').trigger('next.owl.carousel');
            })
            // Go to the previous item
            $('#left-btn').click(function() {
                $('#library-owl-carousel').trigger('prev.owl.carousel');
            })
        });

        function artLibDetail(){
            console.log('a');
            $('body').css('display','block');
        }
    </script>
    </body>
</html>