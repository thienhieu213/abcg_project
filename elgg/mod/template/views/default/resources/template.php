<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/style.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/owl.carousel.min.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/responsive.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
</head>
<body>
<div class="header-cover">
    <div class="row">
        <div class="col-lg-2 col-md-2 logo">
            <img src="./img/logo.png">
        </div>
        <div class="col-lg-4 col-md-4">
            <div class="input-group stylish-input-group">
                <input type="text" class="form-control"  placeholder="Search" >
                <span class="input-group-addon">
                    <button type="submit">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>  
                </span>
            </div>
        </div>
        <div class="col-lg-2 col-md-2 btn-top">
            <button class="btn btn-warning">Explore Arts</button>
        </div>
        <div class="col-lg-2 col-md-2 artsquare">
            <a>Artsquare</a>
        </div>
        <div class="col-lg-2 col-md-2 signin">
            <a id="signin_button" data-toggle="modal" data-target="#signin-box">Sign In / Sign Up <span class="glyphicon glyphicon-triangle-bottom"></span></a>
             <!-- Modal -->
            <form method="post" id="formSignin">
                <div class="modal fade" id="signin-box" role="dialog">
                    <div class="modal-dialog">
                    <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Sign In</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" name="usernameSignin">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" name="passwordSignin">
                                </div>

                                <a id="forgot_button">Forgot Password?</a>
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Log in!</button>
                            </div>
                            <div class="modal-footer">
                                <a href="signup" id="signup-link">Sign Up</a>
                                <img src="./img/facebook.png">
                                <img src="./img/twitter.png">
                                <img src="./img/google.png">
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <form method="post" id="formForgot">
                <div class="modal fade" id="forgot-box" role="dialog">
                    <div class="modal-dialog">
                    <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Forgot Password</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" name="emailForgot">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Send Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>