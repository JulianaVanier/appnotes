<?php

$serverName = 'localhost';
$userName = 'juliananotes';
$password = 'juliana@1240';
$databaseName = 'app_notes';

// Opening session to bring user id
session_start();

try {
    $conn = @mysqli_connect($serverName, $userName, $password, $databaseName);
    if (mysqli_connect_errno()) {
        throw new RuntimeException('mysqli connection error: ' . mysqli_connect_error());
    }
    mysqli_query($conn, "SET NAMES 'utf8' COLLATE 'utf8_general_ci'");

    if($_GET["action"]=="create"){
        create($conn);
    } else if ($_GET["action"] == "notes") {
        getNotesFromUser($conn);
    } else if ($_GET["action"] == "delete") {
        deleteAllNotes($conn);
    }

	//Process connect error
} catch (Exception $e) {
        $return["error"] = 'Connection failure in myfeed @ 24';
    //json_encode($return);
        echo json_encode($return);
        exit();
} 

// finally {
//     mysqli_close($conn);
// }

function create($conn)
{
        
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $notes = mysqli_real_escape_string($conn, $_POST['notes']);
    $currentDate = mysqli_real_escape_string($conn, $_POST['currentDate']);
    $image = $_FILES['image'];
    $file = file_get_contents($image["tmp_name"], true);
    $imageEncoded = base64_encode($file);
    // added user id from session
    $user_id = $_SESSION['user_id']; 
    

    $sql = "INSERT INTO notes ( date, title, notes, image, id_user) VALUES ('$currentDate', '$title', '$notes', '$imageEncoded' , '$user_id')";

    if (mysqli_query($conn, $sql)) {
        //get id from db
        $last_id = mysqli_insert_id($conn);

        getInfByID($conn, $last_id);

        // echo "$last_id";
        // echo "New record created successfully"; 

    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}

function getInfByID($conn, $last_id){

    // $conn = mysqli_connect("localhost", "username", "password", "database_name");

    // if (!$conn) {
    //     die("Connection failed: " . mysqli_connect_error());
    // }

    $sql = "SELECT * FROM notes WHERE IDNotes = $last_id";

    $result = mysqli_query($conn, $sql);


    if (mysqli_num_rows($result) > 0) {
        // array to save notes from DB
        $notes = array();

        // loop to save notes from DB
        while ($row = mysqli_fetch_assoc($result)) {
            $notes[] = array(
                "id" => $row["IDNotes"],
                "title" => $row["title"],
                "note" => $row["notes"],
                "image" => $row["image"],
                "date" => $row["date"]
            );
        }

        echo json_encode($notes);


    } else {
            echo "No notes found in database.";
    }
        // Fecha a conexão com o banco de dados
        mysqli_close($conn);

}

// function to bring all notes from user in DB
function getNotesFromUser($conn)
{

    $user_id = $_SESSION['user_id']; 
    // $conn = mysqli_connect("localhost", "username", "password", "database_name");

    // if (!$conn) {
    //     die("Connection failed: " . mysqli_connect_error());
    // }

    $sql = "SELECT * FROM notes WHERE id_user = $user_id";

    $result = mysqli_query($conn, $sql);


    if (mysqli_num_rows($result) > 0) {
        // array to save notes from DB
        $notes = array();

        // loop to save notes from DB
        while ($row = mysqli_fetch_assoc($result)) {
            $notes[] = array(
                "id" => $row["IDNotes"],
                "title" => $row["title"],
                "note" => $row["notes"],
                "image" => $row["image"],
                "date" => $row["date"]
            );
        }

        echo json_encode($notes);
    } else {
        echo "No notes found in database.";
    }
    // Fecha a conexão com o banco de dados
    mysqli_close($conn);
}

function deleteAllNotes($conn){

    $user_id = $_SESSION['user_id'];

    $sql = "DELETE FROM notes WHERE id_user = $user_id";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $return["error"] = 'Failed to delete note from database';

        echo json_encode($return);
        exit();
    }

    $return["success"] = 'Note deleted successfully';

    echo json_encode($return);

}

?>