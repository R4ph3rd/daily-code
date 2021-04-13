<?php
session_start();
$_SESSION['admin_page'] = true;
?>

<form method="POST" action="../utils/changeClient.php">
    <label for="client[name]">Nom</label>
    <input type="text" name="client[name]" value="<?php echo $_SESSION['client']->name; ?>">
    <label for="client[firstname]">Prénom</label>
    <input type="text" name="client[firstname]" value="<?php echo $_SESSION['client']->firstname; ?>">
    
    <label for="client[mail]">Mail</label>
    <input type="text" name="client[mail]" disabled value="<?php echo $_SESSION['client']->mail; ?>">
    <label for="client[password]">Password</label>
    <input type="password" name="client[password]" disabled value="<?php echo $_SESSION['client']->password; ?>">

    <input type="submit" value="Valider les changements">
</form>