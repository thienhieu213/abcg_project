<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/style.css">
<link rel="stylesheet" type="text/css" href="mod/template/views/default/resources/css/responsive.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

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
    <form method="post" id="formSignup">
        <div class="form-group">
            <input type="text" name="nameSignup" placeholder="Name">
        </div>
        <div class="form-group">
            <input type="text" name="usernameSignup" placeholder="Username">
        </div>
        <div class="form-group">
            <input type="text" name="emailSignup" placeholder="Email">
        </div>
        <div class="form-group">
            <input type="password" name="passwordSignup" placeholder="Password">
        </div>
        <div class="form-group">
            <input type="password" name="confirmSignup" placeholder="Confirm Password">
        </div>
        <div class="form-group" id="dayOfBirth">
            <label>Date of birth</label>
            <select name="day" id="day"></select>
            <select name="month" id="month"></select>
            <select name="year" id="year"></select>
        </div>
        <div class="form-group" id="gender">
            <label>Gender</label>
            <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </div>
        <p>OR</p>
        <button class="btn btn-primary btn-facebook"><i class="fab fa-facebook-f"></i>Facebook</button>
        <button class="btn btn-primary btn-twitter"><i class="fab fa-twitter"></i>Twitter</button>
        <button class="btn btn-default btn-google"><i class="fab fa-google"></i>Google</button>

        <div class="checkbox checkbox-design" >
        <label for="checkbox-design"><input type="checkbox" value="policy" id="checkbox-design"/>I have read and agreed to ABCG Terms of Service and Etiquette Policy</label>
        </div>
        <button type="submit" class="btn btn-primary btn-create">Create Account</button>
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