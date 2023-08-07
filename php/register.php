<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vanier Notes</title>
    <link rel="stylesheet" href="../css/style.css" />
    <script src="js/action.js" defer></script>
    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
    <!-- jquery -->
</head>

<body>
    <div class="general_box"></div>
    <header class="box_header">
        <nav class="container">
            <div class="box_nav">
                <div class="logo">
                    <img src="../img/vanier_logo.png" alt="Vanier Notes Logo" />
                </div>
            </div>
        </nav>
    </header>
    <main>
        <section class="middle_page">
            <form method="post" action="register.php">
                <label for="username">Username:</label>
                <input type="text" name="username" required><br>

                <label for="password">Password:</label>
                <input type="password" name="password" required><br>

                <label for="email">Email:</label>
                <input type="email" name="email" required><br>

                <input type="submit" value="Register">
                <a href="login.php" class="link_login">
                    Back
                </a>
            </form>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="box_footer">
            </div>
        </div>
    </footer>
</body>

</html>


<?php

//create space in the server to save data
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    // Connect to the database
    $conn = mysqli_connect('localhost', 'juliananotes', 'juliana@1240', 'app_notes');

    // Check if the username is already taken
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        echo '<script>alert("Username already taken")</script>';
        exit();
    }

    // Hash the password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert the user data into the database
    $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$password_hash', '$email')";

    if (mysqli_query($conn, $query)) {
        // echo "Registration successful";
        $_SESSION['user_id'] = mysqli_insert_id($conn);
        $_SESSION['username'] = $username;

        header('Location: ../index.php');
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    mysqli_close($conn);
}
?>