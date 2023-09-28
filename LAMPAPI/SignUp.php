
<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
    $usernameS = $inData["username"];
    $passwordS= $inData["password"];

	$host = "localhost"; // Replace with your database host
    $dbname = "COP4331"; // Replace with your database name
    $username = "TheBeast"; // Replace with your database username
    $password = "WeLoveCOP4331"; // Replace with your database password

    $mysqliCon = new mysqli($host, $username, $password, $dbname);
	if( $mysqliCon->connect_error )
	{
		returnWithError( $mysqliCon->connect_error );
	}
	else
	{
		$stmt = $mysqliCon->prepare("SELECT ID,FirstName,LastName FROM Users WHERE (Login=? AND Password =?)");
		$stmt->bind_param("ss", $inData["username"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithError("Failed");
		}
		else
		{
			$stmt = $mysqliCon->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $firstname, $lastname, $usernameS, $passwordS);
			$test = $stmt->execute();

			$stmt->close();
			$mysqliCon->close();

			if($test == true)
			{
				returnWithError("Success");
			}
			else if($test == false)
			{
				returnWithError("Failed");
			}
		}
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
