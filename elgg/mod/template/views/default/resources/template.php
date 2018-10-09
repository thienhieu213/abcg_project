<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/style.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/responsive.css">

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
            <input class="btn btn-warning " value="Explore Arts">
        </div>
        <div class="col-lg-1 col-md-1 artsquare">
            <a>Artsquare</a>
        </div>
        <div class="col-lg-1 col-md-1 signup">
            <a href='signup'>Sign up</a>
        </div>
        <div class="col-lg-1 col-md-1 signin">
            <a id="signin_button" data-toggle="modal" data-target="#signin-box">Sign in <span class="glyphicon glyphicon-triangle-bottom"></span></a>
             <!-- Modal -->
            <form method="post" id="formSignin"
            action="http://localhost/elgg-example/elgg/action/login"
            enctype="multipart/form-data">
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
                                    <?php $__elgg_ts = time(); ?>
                                    <input name="__elgg_ts" value="<?php echo $__elgg_ts ?>" type="hidden">
                                    <input name="__elgg_token" value="<?php echo generate_action_token($__elgg_ts) ?>" type="hidden">
                                    <label>Username</label>
                                    <input type="text" name="username">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a id="forgot_button" >Forgot Password?</a>
                                <div class="form-group">
                                  <button type="submit" class="btn btn-primary">Log in!</button>
                                </div>
                                <a href="signup" id="signup-link">or Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <form method="post" id="formForgot"
            action="action/user/requestnewpassword">
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
                                    <?php $__elgg_ts = time(); ?>
                                    <input name="__elgg_ts" value="<?php echo $__elgg_ts ?>" type="hidden">
                                    <input name="__elgg_token" value="<?php echo generate_action_token($__elgg_ts) ?>" type="hidden">
                                    <label>Email</label>
                                    <input type="text" name="username">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Send Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
