# Pantstation Notifier

En lille NodeJS app der sender en notifikation via [Pushover](https://pushover.net/) når en Pantstation ændre status.
Applikationen skal bruge 3 environment variabler, `PUSHOVER_APP_TOKEN`, `PUSHOVER_USER_KEY` og `URL`. URL'en er adressen til en specific Pantstation, fx. https://danskretursystem.dk/pantstation/herning.

Nedenstående er status teksten som bliver scrapet.
![](./screenshot.png)


## Build and run
```
git clone https://github.com/Kerwood/pantstation-notifier.git
cd pantstation-notifier
docker build -t pantstation .
```

```
docker run --rm \
  --name pantstation \
  -e PUSHOVER_APP_TOKEN=<token-here> \
  -e PUSHOVER_USER_KEY=<user-key-here> \
  -e URL=https://danskretursystem.dk/pantstation/herning  \
  --restart unless-stopped \
  -d pantstation
```
