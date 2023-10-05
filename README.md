# Eulerian-server-side

Il existe 2 parties pour envoyer des données à Eulerian en utilisant cette methode :

- **Le transport** : où et comment vous envoyez des données.
- **La charge utile** : les données que vous envoyez.

## URL de l'Endpoint

Vous envoyez des données à Eulerian en effectuant des requêtes HTTP vers une URL d'endpoint spécifique. Cette URL est construite en fonction du nom d'hôte de suivi, du type et du nom du site web. Vous devez toujours utiliser HTTPS pour une communication sécurisée.

Par exemple

`https://TRACKING_HOSTNAME/TYPE/WEBSITE_NAME/`.

si vous avez :

- Nom d'hôte de suivi : `dem.eulerian.net`
- Type : `collector`
- Nom du site web : `demo-site`

L'endpoint sera : `https://dem.eulerian.net/collector/demo-site/`.

## Transport des données :

Vous pouvez envoyer des données en utilisant des requêtes POST ou GET.

**Requêtes POST** : Recommandées pour l'envoi de données. Vous envoyez une requête HTTP POST à l'endpoint. Les données à envoyer, qui contiennent les informations que vous souhaitez transmettre, sont incluses dans le corps de la requête POST. Vous devez également inclure une chaîne User-Agent pour identifier votre bibliothèque client.

**Requêtes GET** : Une alternative pour les environnements où les données POST ne peuvent pas être envoyées. Vous envoyez une requête HTTP GET au même endpoint, et les données de la charge utile sont incluses sous forme de paramètres de requête URI encodés dans l'URL. Encore une fois, vous devez inclure une chaîne User-Agent.

Ces appels peuvent être effectués directement par le client ou par le serveur. Veuillez vérifier les paramètres à envoyer ci-dessous.

Si vous utilisez une bibliothèque personnalisée qui peut être identifiée comme un robot (comme cURL ou wget), l'appel ne sera pas enregistré. Vous devez fournir un User-Agent spécifique ou un User-Agent standard pour remplacer celui par défaut de votre bibliothèque client, afin que l'appel puisse être traité. (par exemple : `Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0`)

#### Utilisation de POST

Nous recommandons d'envoyer des données via POST car cela permet une charge utile plus importante. Lors de l'utilisation de POST, émettez la requête HTTP suivante :

```
User-Agent: user_agent_string
POST endpoint_url
payload_data`
```

Où :

- `user_agent_string` : est le User-Agent de votre bibliothèque client.
- `endpoint_url` : est l'URL de l'Endpoint tel que spécifié ci-dessus pour votre site particulier.
- `payload_data` : Le CORPS de la requête POST, qui doit inclure exactement 1 charge utile encodée en URI et ne doit pas dépasser 8192 octets.

#### Utilisation de GET

Pour les environnements où vous ne pouvez pas envoyer de données POST, vous pouvez également envoyer des requêtes HTTP GET vers le même endpoint :

```
GET /type/website_name?payload_data HTTP/1.1
Host: tracking_hostname
User-Agent: user_agent_string
```

Où :

- `website_name` : le nom de votre site web dans la plateforme.
- `payload_data` : les données de la charge utile sont envoyées sous forme de paramètres de requête URI encodés.
- `tracking_hostname` : le nom d'hôte de suivi de votre site.
- `user_agent_string` : est le User-Agent de votre bibliothèque client.

La longueur de l'URL encodée dans son intégralité ne doit pas dépasser 8000 octets.

#### Cache Busting 

Pour empêcher la mise en cache des requêtes GET, vous pouvez inclure une valeur **CACHE_BUSTER** en tant que dernière valeur de chemin dans l'URL ou en tant que paramètre GET via **ea-rnd**. Cela garantit que la requête n'est pas extraite de la mise en cache et est envoyée à Eulerian.

#### Code de réponse

Lorsque vous envoyez des données avec Eulerian server-side, Eulerian répondra avec des codes d'état HTTP. Un code d'état 2xx indique que la requête a été reçue avec succès. Cependant, Eulerian ne renvoie pas de code d'erreur pour des données de charge utile mal formées ou incorrectes. Si vous ne recevez pas un code d'état 2xx, vous devez résoudre tout problème avec votre requête HTTP.

#### Données de la charge utile 

Toutes les données collectées par Eulerian à l'aide du protocole de mesure sont envoyées sous forme de charge utile. Cette charge utile suit un format similaire à une chaîne de requête d'URL, avec des paires clé-valeur séparées par '=' et des paires individuelles séparées par '&'.

Exemple de charge utile :

`key1=val1&key2=val2`

Chaque paramètre dans la charge utile a des règles spécifiques concernant les valeurs requises, l'encodage URI, les combinaisons de paramètres et la longueur. Il est essentiel de respecter ces règles lors de la construction de votre charge utile.
