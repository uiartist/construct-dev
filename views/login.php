<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Login page">
    <title>Login</title>

    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">

    <style>
      html, body {
        height: 100%;
      }
      body {
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
      }
      .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
      }
    </style>
  </head>
  <body class="text-center">
    <form class="form-signin" method="POST" action="/api/login">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email address" required autofocus>
      
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" name="password" class="form-control mt-2" placeholder="Password" required>
      
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2025</p>
    </form>
  </body>
</html>
