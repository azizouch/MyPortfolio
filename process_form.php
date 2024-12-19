<?php
require 'vendor/autoload.php'; // Load PHPMailer library

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // You can perform additional validation or filtering here before sending the email

    // Send the email using PHPMailer
    $mail = new PHPMailer\PHPMailer();
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your_gmail_address@gmail.com'; // Replace with your Gmail address
        $mail->Password = 'your_gmail_password'; // Replace with your Gmail password or app password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('your_gmail_address@gmail.com', 'Your Name'); // Replace with your Gmail address and your name
        $mail->addAddress('contact@example.com'); // Replace with the recipient's email address
        $mail->isHTML(false);

        $mail->Subject = $subject;
        $mail->Body = "Name: $name\nSubject: $subject\nMessage:\n$message\n";

        if ($mail->send()) {
            // Email sent successfully
            header("Location: thank_you.php"); // Redirect to a thank you page
            exit();
        } else {
            // Error sending email
            header("Location: error.php"); // Redirect to an error page
            exit();
        }
    } catch (Exception $e) {
        // Exception occurred while sending email
        header("Location: error.php"); // Redirect to an error page
        exit();
    }
}
?>
