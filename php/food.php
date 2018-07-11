<?php
include "utilities.php";

 /*sql to create table
    CREATE TABLE food (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL,
    category VARCHAR(30) NOT NULL
    */

//Get info from URL and place in an array
       $args = getArgs();
        
//Get http method
        $method = getMethod();
   

//Get any sent data from appropriate source based on method
        $data = '';
        switch($method) {
        case 'DELETE':
        case 'POST':
                
            $request = cleanInputs($_POST);
                $file = file_get_contents("php://input");
                //print_r($file);
                $data = addFood(json_decode($file));
            break;
        case 'GET':
            $request = cleanInputs($_GET);
                $data = getFood($args);
            break;
        case 'PUT':
            $request = cleanInputs($_GET);
            $file = file_get_contents("php://input");
            break;
        default:
            $_response('Invalid Method', 405);
            break;
        }
//output results (response) in json format
echo response($data);




//function to handle get method call
function getFood($data) {
    $conn = dbConnect();
    //print_r($data);
    if(isset($data[2])) { //there was an id passed in get one
        $sql = "select * from food where id = $data[2]";
    } else { //no id get all
        $sql = "select * from food";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        $i=0;
        while($rows[$i] = $result->fetch_assoc()) {
            $i++;
        }
        return $rows;
    } else {
        echo "0 results";
    }

}

//function to handle post method call
function addFood($data) {
     $conn = dbConnect();
    //print_r($data->name);
    
$sql = "INSERT INTO food (name, category)
VALUES ('$data->name', '$data->category')";

if ($conn->query($sql) === TRUE) {
   $last_id = $conn->insert_id;
    //echo "New record created successfully. Last inserted ID is: " . $last_id;
    return $last_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
}

   
   
?>