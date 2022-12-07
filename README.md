<p align="center">
<img src="./data/readme.png">
</p>

<h3 align="center">CloudWalk  Risk Test</h3>

---

<p align="center"> First of all this project make me had a lot of fun, and learn a lot, thanks for the opportunity. Here you will see the answer about some questions and a self implement solution of payment analysis, i hope you enjoy it. This project (Question #3) use, docker, docker-compose, python, machine learning, ruby on rais and nodejs. It's a first time using some of these technologies.
</p>

## 📝 Table of Contents

- [Question #1](#1)
- [Question #2](#2)
- [Question #3](#3)
- [About](#3.1)
- [Usage](#3.2)
- [Links](#links)

## 🧐 Question 1 <a name = "1"></a>

#### 1.1 Explain the money flow and the information flow in the acquirer market and the role of the main players.

So the custumer, like me a fewer days before, think the process is just check your password and if have funds, big mistake.

Client click on "confirm" using your machine card or other payment connector and the info flows like:

- -> Gateway -> Sub-Acquirer -> Acquirer ->

## 🧐 Question 2<a name = "2"></a>

#### 1.1 Explain the money flow and the information flow in the acquirer market and the role of the main players.

So the custumer, like me a fewer days before, think the process is just check your password and if have funds, big mistake.

Client click on "confirm" using your machine card or other payment connector the info flows like:

- Gateway -> Acquirer

## 🧐 Question 3 <a name = "3"></a>

### About <a name = "3.1"></a>

On this project i implement a multisystem solution, one system will process the first request and using some protections will reject or not the request initially. If it is ok, this system make two request to other two systems at the same time, if one of these denied the transaction an error occur stopping the process and responding with reject message. One of these systems is implemented using machine learning, which return a percentage of fraud and other system is have static rules like a blacklist of users . The image bellow explain it better.

<img src="./data/mindmap.jpg">

- **Gateway**: Building on NodeJS this choice occur first because i'm more acquainted using it, and seccond is because NodeJS(Javascript) is very good with promises and requests. I used Redis to reject fast multiple transactions of the same user, and postgres to store credentials.

- **ML-Service**: Building using tensorflow, keras and flask, this choice is because machine larning can show the best option when static rules don't block suspect transactions. And this stack is the more fast to learn and implement in on few days using some templates and tutorials.

- **Rules-Service**: Builded using Ruby on Rails is a choice by the maintenance, performance, what is very good to process static rules like storing blacklist and verifing this. The idea was use more complex static rules but it will encrease mutch the time of building, so now only have have one simple route, schema and function.

- **Dockerized**: All this project run just running 'docker-compose up', eacth system have a specify container.

### Prerequisites

You need install **_GIT_** if you don't already have, to clone project,.

<a href="https://git-scm.com/downloads">Click here</a> or Acess:

```
https://git-scm.com/downloads
```

You need install **_Docker_** on your machine if you don't already have.

<a href="https://docs.docker.com/get-docker">Click here</a> or Acess:

```
https://docs.docker.com/get-docker/
```

And use the step-by-step doc to download and install on your specific system.

### Installing

1 - Clone on your local system

```
git clone https://github.com/raferdev/clouckwalk
```

2 - Go to project path

```
cd clouckwalk
```

3 - Create env file

You can rename the ".env.exemple" file to ".env", just removing ".exemple" and save, or follow this steps to create new one:

- Open a text editor or other editor do you prefeer, create this variables like below and save file with name '.env'.

```
MLPORT=5000
DATABASE_URL="postgresql://cloudwalk:cloudwalkpass@postgres:5432/cloudwalkdb?schema=public"
POSTGRESPORT=5432
RULESPORT=3000
ML_SERVER="http://mlservices:5000/"
PORT=3000
PORTGAT=5050
POSTGRES_DB=cloudwalkdb
POSTGRES_USER=cloudwalk
POSTGRES_PASSWORD=cloudwalkpass
REDISPORT=6379
REDIS_URL=redis://@redis:6379
RULES_SERVER="http://rulesservices:3000/"
```

You can change the values of variables if you want or need.

### Start

Use on terminal:

```
docker-compose up
```

_The attached console will show "Hello i'm running on port = (PORT)" and after some mongodb logs._

---

## 🎈 Usage <a name="3.2"></a>

ow you will need one tool to make requests and interact whith your API. Some famous API Clients are <a href="https://insomnia.rest/download">Insomnia</a>, <a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client">Thunder CLient</a> to VSCode users, <a href="https://www.postman.com/">Postman</a> and many others, like browsers plugins. If you dont use to complex jobs any of these will help you.

- **GUIDE** :

  **HTTP METHOD** - _/route_ - Little description of it behaviour.

  ```
    Received or sended object schema.
    Ex: {
    "text":"Lorem ipsum..."
    }
  ```

  _Final thoughts about API behaviour_

  ***

  Exemple:

  **GET** - _/health_ - API return status 200 with object below.

  ```
  {
    "message":"I'm Alive!"
  }
  ```

  Simple way to verify if API is up. _Maybe is not implemented on this project_

  ***

  **Usage** - In this case you will make a GET request on http://localhost:5000/health. And will receive the JSON object "message: I'm Alive!" on the console, terminal or display, depending on the case.

  ***

**LET'S GO** - API description.

**POST** - _/:token_ - The token is sended on the route, so dont need header with authorization, the api verify if its the same stored on credentials.

Exemple of route with token (can use):

```
http://localhost:5050/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**BODY:**

```
  {
  "user_id":21320399,                          (number)
  "transaction_id": 92895,                     (number)
  "merchant_id": 2708,                         (number)
  "card_number": "444456******4210",           (string)
  "transaction_date": "2019-12-01T22:45:37873639", (string)
  "transaction_amount": 734.87, (number)
  "device_id": 497105 (number)
  }
```

**The possible messages and exemples bellow:**

**Approved**
<img src="./data/exemple1.png">

**Denied**
<img src="./data/exemple2.png">

**Transaction reject by too much requests by same user**

<img src="./data/exemple3.png">

**If you want see the rate by the machine learning you can see the terminal like this message**

<img src="./data/exemple5.png">

## 🎉 Links <a name = "links"></a>

<img align="right" height="100px" src="./data/cloudwalk.gif" alt="Project logo">
