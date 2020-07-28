<?php
    // include database 
    require_once "connect.php";

    //conect with database
    $conn = @new mysqli($host,$db_user,$db_password,$db_name);
    if ($conn->connect_error) {
        die("Connection Failed !".$conn->connect_error);
    }
    
    $result = array('error'=>false);
    $action = '';

    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    }
    // read
    if ($action == 'read') {
        $sql = $conn->query("SELECT * FROM users");
        $users = array();
        while($row = $sql->fetch_assoc()) {
            array_push($users, $row);

        }
        $result['users'] = $users;
    }
    // Add new 
    if ($action == 'create') {
        
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];

        $sql = $conn->query("INSERT INTO users (name, email, phone) VALUES('$name', '$email', '$phone')");
        
        if ($sql) {
            $result['message'] = "User added successfully";
        }
        else {
            $result['error'] = true;
            $result['message'] = "Failed to add user!";
        }
    }
    /// update 
    if ($action == 'update') {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];

        $sql = $conn->query("UPDATE users SET name='$name', email='$email', phone='$phone' WHERE id='$id'");
    
        if ($sql) {
            $result['message'] = "User updated successfully";
        }
        else {
            $result['error'] = true;
            $result['message'] = "Failed to update user!";
        }
    }
    /// DELETE 
    if ($action == 'delete') {
        $id = $_POST['id'];
    
        $sql = $conn->query("DELETE FROM users WHERE id='$id'");
        
        if ($sql) {
            $result['message'] = "User deleted successfully";
        }
        else {
            $result['error'] = true;
            $result['message'] = "Failed to delete user!";
        }
    }

    $conn->close();
    echo json_encode($result);