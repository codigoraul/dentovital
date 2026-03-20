<?php
header('Content-Type: application/json');
echo json_encode([
  'status' => 'ok',
  'message' => 'PHP funciona correctamente',
  'php_version' => phpversion(),
  'mail_function' => function_exists('mail') ? 'disponible' : 'no disponible'
]);
