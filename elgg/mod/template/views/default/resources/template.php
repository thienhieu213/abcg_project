<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/style.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/owl.carousel.min.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/responsive.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css">
</head>
<body>
<div class="header-cover">
    <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 logo">
            <img src="./img/logo.png">
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="input-group stylish-input-group">
                <input type="text" class="form-control"  placeholder="Search" >
                <span class="input-group-addon">
                    <button type="submit">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>  
                </span>
            </div>
            <div id="advancedSearch" data-toggle="modal" data-target="#advancedSearch-box">Advanced Search <span class="glyphicon glyphicon-triangle-bottom"></span></div>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 btn-top">
            <button class="btn btn-warning">Explore Arts</button>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 artsquare">
            <a href="artsquare">Artsquare</a>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 signin">
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

            <form method="post" id="formAdvancedSearch">
                <div class="modal fade" id="advancedSearch-box" role="dialog">
                    <div class="modal-dialog">
                    <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Type of arts :</label><br/>
                                    <input type="checkbox" name="typeArt" value="mixedMedia"> Mixed media<br/>
                                    <input type="checkbox" name="typeArt" value="drawing"> Drawing <br/>
                                    <input type="checkbox" name="typeArt" value="paiting"> Painting <br/>
                                    <input type="checkbox" name="typeArt" value="photography"> Photography <br/>
                                    <input type="checkbox" name="typeArt" value="printings"> Printings <br/>
                                    <input type="checkbox" name="typeArt" value="sculptures"> Sculptures <br/>
                                    <input type="checkbox" name="typeArt" value="others"> Others <br/>
                                </div>
                                <div class="form-group">
                                    <label>Color uses :</label><br>
                                </div>
                                <div class="form-group">
                                    <label>Filter by :</label><br/>
                                    <input type="radio" name="filter" value="artpiece"> Artpiece <br/>
                                    <input type="radio" name="filter" value="artist"> Artist <br/>
                                    <input type="radio" name="filter" value="brand"> Brand <br/>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>