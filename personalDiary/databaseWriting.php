<?php
$account = $_POST["account"];
$password = $_POST["password"];
$diaryList = $_POST["diaryList"];

echo "Account: $account";
echo "Password: $password";
echo "Diary List: $diaryList";

class User {
    public $account;
    public $password;
    public $diaryList;
}

$database = Array();

$newUser = new User();

?>