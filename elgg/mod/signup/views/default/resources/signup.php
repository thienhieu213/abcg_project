<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/style.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/responsive.css">


</head>
<body onload="dayOfBirth()">
<div class="header-cover">
    <div class="row">
        <div class="col-lg-2 col-md-2 logo">
            <img src="./img/logo.png">
        </div>
</div>
<div class="signup-cover">
    <h2>Sign Up</h2>
    <form method="post" id="formSignup" action="action/register">
        <div class="form-group">
            <?php $__elgg_ts = time(); ?>
            <input name="__elgg_ts" value="<?php echo $__elgg_ts ?>" type="hidden">
            <input name="__elgg_token" value="<?php echo generate_action_token($__elgg_ts) ?>" type="hidden">
            <input type="text" name="name" placeholder="Name">
        </div>
        <div class="form-group">
            <input type="text" name="username" placeholder="Username">
        </div>
        <div class="form-group">
            <input type="text" name="email" placeholder="Email">
        </div>
        <div class="form-group">
            <input type="password" name="password" placeholder="Password">
        </div>
        <div class="form-group">
            <input type="password" name="password2" placeholder="Confirm Password">
        </div>
        <div class="form-group">
            <label>Date of birth</label>
            <select name="day" id="day"></select>
            <select name="month" id="month"></select>
            <select name="year" id="year"></select>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <select name="gender" ></select>
        </div>
        <button type="submit" class="btn btn-primary">Create Account</button>
    </form>


    <script>
        function day(){
            for (var i=1;i<32;i++){
                var sel = document.getElementById("day");
                var op = document.createElement("OPTION");
                var val = document.createTextNode(i);
                op.setAttribute("value",i);
                op.appendChild(val);
                sel.appendChild(op);
            }
        }
        function month(){
            for (var i=1;i<=12;i++){
                var sel = document.getElementById("month");
                var op = document.createElement("OPTION");
                var val = document.createTextNode(i);
                op.setAttribute("value",i);
                op.appendChild(val);
                sel.appendChild(op);
            }
        }
        function year(){
            for (var i=1900;i<=2019;i++){
                var sel = document.getElementById("year");
                var op = document.createElement("OPTION");
                var val = document.createTextNode(i);
                op.setAttribute("value",i);
                op.appendChild(val);
                sel.appendChild(op);
            }
        }
        function dayOfBirth(){
            day();
            month();
            year();
        }
    </script>
</div>
