<?php
require 'flight/Flight.php';

// Enable CORS (important for React)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Default route
Flight::route('/', function(){
    echo 'Hello from Flight running on PHP 7.4 with XAMPP!';
});

// Example API route
Flight::route('/api/hello', function(){
    Flight::json(['message' => 'Hello API']);
});

// Example endpoint: Get all projects
Flight::route('GET /api/projects', function(){
    $projects = [
        ["id" => 1, "name" => "Lotus Complex", "status" => "Ongoing"],
        ["id" => 2, "name" => "Highway Bridge Heights", "status" => "Planned"]
    ];
    Flight::json($projects);
});

Flight::start();
