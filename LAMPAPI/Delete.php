<?php

	$inData = getRequestInfo();
	
	$userid = $inData["userid"];
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
		$stmt = $mysqliCon->prepare("DELETE FROM Contacts WHERE (CID = ? AND ID = ?)");
		$stmt->bind_param("ii", $cid, $userid);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>