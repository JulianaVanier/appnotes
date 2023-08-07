<?php

// Starts a session and checks if the user is logged in. If not, it redirects to the login page.
// Gets the user's ID and username from the session variables.
// Connects to the database and retrieves the user's data based on their ID.
// Displays the user's information on the page, including their ID and email address.
// Closes the database connection.

session_start();

if (!isset($_SESSION['user_id'])) {
    // User is not logged in, redirect to login page
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];

// Connect to the database
$conn = mysqli_connect('localhost', 'juliananotes', 'juliana@1240', 'app_notes');

// Get the user's data from the database
$query = "SELECT * FROM users WHERE id='$user_id'";
$result = mysqli_query($conn, $query);
$user_data = mysqli_fetch_assoc($result);

// Display the user's information
echo "<h1>Welcome, $username!</h1>";
echo "<p>Your ID is: $user_id</p>";
echo "<p>Your email is: " . $user_data['email'] . "</p>";
echo "<a href=\"logout.php\">Logout</a>";

mysqli_close($conn);
?>
