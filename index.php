<?php
require 'flight/Flight.php';
require 'lib/jwt.php';
require 'config.php';

// Register DB service (adjust credentials)
Flight::register('db', 'PDO', array(
    "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
    DB_USER,
    DB_PASS
), function($db) {
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
});

// Middleware to protect routes
function require_auth() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        Flight::halt(401, json_encode(["success" => false, "message" => "Authorization header missing or invalid"]));
    }

    $jwt = $matches[1];
    $payload = SimpleJWT::decode($jwt);

    if (!$payload) {
        Flight::halt(401, json_encode(["success" => false, "message" => "Invalid or expired token"]));
    }

    // Attach user info to Flight for use in routes
    Flight::set('user', $payload);
}

// 1) API routes first
Flight::route('GET /api/hello', function() {
    header("Content-Type: application/json");
    echo json_encode(["message" => "Hello from API!"]);
});

// login API
Flight::route('POST /api/login', function() {
    $request = Flight::request();
    $email = $request->data->email;
    $password = $request->data->password;
    //die($email.' > '.$password);

    $pdo = Flight::db();
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Get the salt from DB
        $salt = $user['salt'];
        $hashedInput = hash('sha256', $password . $salt);
        
if (hash_equals($user['password'], $hashedInput)) {
            // ✅ Successful login → generate JWT
            $payload = [
                "id" => $user['id'],
                "email" => $user['email']
            ];
            $token = SimpleJWT::encode($payload);

            Flight::json([
                "success" => true,
                "token" => $token,
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
            return;
        }
    }

    // ❌ If login failed
    Flight::json(["success" => false, "message" => "Invalid credentials"], 401);
});

// Dashboard API route (protected)
Flight::route('GET /api/dashboard', function() {
    require_auth(); // ✅ this checks JWT before allowing access
    
    $payload = Flight::get('user'); // we set this in require_auth()
    
    $data = [
        "username" => "Admin",
        "role" => "Administrator",
        "projects" => 5,
        "tasks" => 12,
        "last_login" => date("Y-m-d H:i:s")
    ];

    Flight::json([
        "success" => true,
        "message" => "Welcome to dashboard!",
        "user" => $payload,
        "data" => $data
    ]);
});

Flight::route('GET /api/projects', function() {
    require_auth(); // ✅ protect with JWT

    $db = Flight::db();

    $stmt = $db->query("
        SELECT 
            id, 
            name, 
            location, 
            status, 
            deadline, 
            created_at
        FROM projects 
        ORDER BY id DESC
    ");

    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    Flight::json([
        'success' => true,
        'data' => $projects
    ]);
});

Flight::route('GET /api/users', function() {
    require_auth(); // ✅ protect with JWT

    $pdo = Flight::db();
    $stmt = $pdo->query("SELECT id, name, email, created_at FROM users ORDER BY id ASC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    Flight::json([
        'success' => true,
        'data' => $users
    ]);
});

/* Flight::route('GET /dashboard', function() {
    //require_auth(); // ✅ protect with JWT
    $user = Flight::get('user');
    Flight::json([
        "message" => "Welcome to your dashboard!",
        "user" => $user
    ]);
}); */

// Dashboard API route
/* Flight::route('GET /api/dashboard', function() {
    // Example: return static/fake dashboard data for now
    $data = [
        "username" => "Admin",
        "role" => "Administrator",
        "projects" => 5,
        "tasks" => 12,
        "last_login" => date("Y-m-d H:i:s")
    ];

    Flight::json([
        "success" => true,
        "data" => $data
    ]);
}); */

// 2) Static assets
Flight::route('GET /assets/*', function() {
    $path = __DIR__ . '/public' . Flight::request()->url;
    if (file_exists($path)) {
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        switch ($ext) {
            case 'js':  header("Content-Type: application/javascript"); break;
            case 'css': header("Content-Type: text/css"); break;
            case 'png': header("Content-Type: image/png"); break;
            case 'jpg':
            case 'jpeg': header("Content-Type: image/jpeg"); break;
            case 'svg': header("Content-Type: image/svg+xml"); break;
            default: header("Content-Type: text/plain");
        }
        readfile($path);
        exit;
    }
    Flight::halt(404, "File not found");
});

// 3) React catch-all (must be last!)
// Catch-all route for React frontend
Flight::route('GET /*', function() {
    $path = __DIR__ . '/public/index.html';
    if (file_exists($path)) {
        readfile($path);
    } else {
        echo "React build not found!";
    }
});

Flight::start();
