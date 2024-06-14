## 03 TP projet de connexion (Challenge)

Vous allez faire une page de connexion et une page "sécurisée" accessible uniquement après une connexion réussie. Il  n'y aura qu'un seul utilisateur.

Pour se connecter l'utilisateur devra renseigner son login/password.

Remarque : vous n'avez pas, pour l'instant, la possibilité de passer des données à la vue, nous verrons comment faire cela dans un prochain cours.

1. Contrainte graphique : vous utiliserez un bootstrap ou un autre framework CSS, il suffit de récupérer les sources et de les placez dans le dossier public. Pensez à faire le nécessaire pour ces fichiers statiques.

2. Construisez un formulaire de connexion : login/password il s'affichera sur la page principale. Pour la gestion des mots de passe vous pouvez utiliser cryptoJS pour hasher le mot de passe.

3. Créez une page que nous allons "sécuriser" à l'aide d'un middleware/

>Les infos user
> ```js
>  const user = {
>   login : "Alan",
>   password : "73a056240baf641c8dc2c9bab20e0c2b457bd6e4" // correspond à "4l4n"
>  }
>```