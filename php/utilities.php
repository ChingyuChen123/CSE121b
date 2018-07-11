<?php
     //function to make sure that the input is safe
      function cleanInputs($data) {
        $clean_input = Array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = cleanInputs($v);
                echo 'key'.$k;
            }
        } else {
            $clean_input = trim(strip_tags($data));
            echo "else";
        }
        return $clean_input;
    }

//function to package up and format the response of the request
function response($data, $status = 200) {
        header("HTTP/1.1 " . $status . " " . requestStatus($status));
        return json_encode($data);
    }

//function to get correct response code
function requestStatus($code) {
        $status = array(  
            200 => 'OK',
            404 => 'Not Found',   
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        ); 
        return ($status[$code])?$status[$code]:$status[500]; 
    }

//function to take the parameters from the URL and put them into an array
function getArgs() {
   $args =  explode('/', rtrim($_SERVER['REQUEST_URI'], '/'));
        //get rid of a couple of un-used parameters
        $endpoint = array_shift($args);
        if (array_key_exists(0, $args) && !is_numeric($args[0])) {
            $verb = array_shift($args);
        }
    return $args;
}

//function to get http method
function getMethod() {
    $method = $_SERVER['REQUEST_METHOD'];
        if ($method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
            if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
                $method = 'DELETE';
            } else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
                $method = 'PUT';
            } else {
                throw new Exception("Unexpected Header");
            }
        }
    return $method;
}

//setup the database connection
function dbConnect() {
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "test";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    return $conn;
}

?>