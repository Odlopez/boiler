<?php
$tel = isset($_POST['tel']) ? trim(strip_tags($_POST['tel'])) : '';
if (! $tel) {
  $errors[] = 'не введет телефон';
}
$mail = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
if (! $mail) {
  $errors[] = 'не введена почта';
}
if (!isset($_SERVER['HTTP_REFERER']) || FALSE === strpos($_SERVER['HTTP_REFERER'], 'http://odlopez.mopax.ru/')) {
  $errors[] = 'отправка с другого сервера';
}

$to = "odlopez1@yandex.ru";
$from = "exem@odlopez.mopax.ru";
$headers = "From: $from \r\n";
$subject = "Отправка формы с сайта!";//Фиксированная тема письма

$mail_to_myemail = "Здравствуйте!
Было отправлено сообщение с сайта!
Телефон отправителя: $tel
E-mail: $mail";

if (isset($errors)) {
  $head = 'Ошибка!';
  $msg = 'Ошибочное заполнение формы: ';
  foreach ($errors as $value) {
    $msg .= ', ' . $value;
  }
  $msg = str_replace(': , ', ': ', $msg) . '.';
  mail($to, $subject, $msg . "\n" . $mail_to_myemail, $headers . 'Content-type: text/plain; charset=utf-8');
}
else {
  $mail = mail($to, $subject, $mail_to_myemail, $headers . 'Content-type: text/plain; charset=utf-8');
}

?>
</body>

</html>
