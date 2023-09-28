<?php
	$inData = getRequestInfo();
	
	$contactname = $inData["ContactName"];
    $email = $inData["Email"];
    $phone = $inData["Phone"];
    $userid = $inData["ID"];
    $cid = $inData["cid"];

	$host = "localhost"; // Replace with your database host
    $dbname = "COP4331"; // Replace with your database name
    $username = "TheBeast"; // Replace with your database username
    $password = "WeLoveCOP4331"; // Replace with your database password

    $mysqliCon = new mysqli($host, $username, $password, $dbname);
	if ($mysqliCon->connect_error) 
	{
		returnWithError( $mysqliCon->connect_error );
	} 
	else
	{
		$stmt = $mysqliCon->prepare("UPDATE Contacts SET ContactName = ?, Email = ?, Phone = ? WHERE (ID = ? AND CID = ?)");
		$stmt->bind_param("sssii", $contactname, $email, $phone, $userid, $cid);
		$stmt->execute();
		$stmt->close();
		$mysqliCon->close();
		returnWithError($cid);
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>