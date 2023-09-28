<?php 
    // This part of the code checks the connection to the database using a mixture of php and Mysql

    $host = "localhost"; // Replace with your database host
    $dbname = "COP4331"; // Replace with your database name
    $username = "TheBeast"; // Replace with your database username
    $password = "WeLoveCOP4331"; // Replace with your database password

    $mysqliCon = new mysqli($host, $username, $password, $dbname);

    // Checks if the connection was an errror and then kill it if it fails
    if ($mysqliCon->connect_error) 
    {
        die("Connection failed: " . $mysqliCon->connect_error);
    }    
?>