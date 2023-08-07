<?php

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


mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- prevente zoom in mobile / reference: https://stackoverflow.com/questions/4472891/how-can-i-disable-zoom-on-a-mobile-web-page -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Vanier Notes</title>
    <link rel="stylesheet" href="css/style.css" />
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
                    <img src="img/vanier_logo.png" alt="Vanier Notes Logo" />
                </div>
                <div class="user">
                    <img src="img/photo_user.png" alt="Photo User" />
                </div>
            </div>
        </nav>
    </header>
    <main>
        <section class="user_info">
            <div class="container">
                <div class="box_user_info">
                    <div class="user_name"><?php echo "<p>Welcome, $username!</p>"; ?></div>
                    <div class="btn_logout"><?php echo "<a href=\"php/logout.php\">Logout</a>"; ?></div>
                </div>
            </div>
        </section>
        <section class="middle">
            <div class="container">
                <div class="box1">
                    <button class="btn" type="button" id="btn_add">
                        Add Note
                    </button>
                    <!-- ********************NEW*********************** -->
                    <button class="btn" type="button" id="btn_delete" onclick="confirmAction()">
                        Delete notes
                    </button>
                    <div class="box"></div>
                </div>
                <div class="notes"></div>
            </div>
        </section>

        <!-- section to show details of note -->
        <section class="modals">
            <!-- modal to view a note -->
            <div class="modal_note"></div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="box_footer">
                <p>Copyright © 2023 Vanier Notes</p>
            </div>
        </div>
    </footer>
</body>

</html>