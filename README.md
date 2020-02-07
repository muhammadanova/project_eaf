# project_eaf
Project EAF Let's Packer
created by Erryn, Anova, Fadhilah
## GET/plan
- Request header:
```
{
  "token": string
}
```
- Request body: 
```
null
```
- Response:
```
200: 
[
  {
    "id": integer,
    "title": string,
    "province" : string,
    "city" : string ,
    "date_plan": date,
    "itinerary": string,
    "transportation": string,
    "equipment": string,
    "budget": integer,
    "createdAt": date,
    "updatedAt": date
  }
]
500:{errors}
```

## GET/plan/:id
- Request header:
```
{
  "token": string
}
```
- Request body:
```
null
```
- Response:
```
200:
{
  "id": integer,
  "title": string,
  "province" : string,
  "city" : string ,
  "date_plan": date,
  "itinerary": string,
  "transportation": string,
  "equipment": string,
  "budget": integer,
  "createdAt": date,
  "updatedAt": date
}
404:
{
  "err": {
    "code": 404,
    "message": "plan not found"
  },
  "msg": "plan not found"
}
500:{errors}
```

## POST/todo
- Request header:
```
{
  "token": string
}
```
- Request body: 
```
{
  "title": string,
  "province" : string,
  "city" : string ,
  "date_plan": date,
  "itinerary": string,
  "transportation": string,
  "equipment": string,
  "budget": integer
}
```
- Response:
```
200: 
{
  "id": integer,
  "title": string,
  "province" : string,
  "city" : string ,
  "date_plan": date,
  "itinerary": string,
  "transportation": string,
  "equipment": string,
  "budget": integer,
  "createdAt": date,
  "updatedAt": date
}
500:{errors}
```

## PUT/plan/:id
- Request header:
```
{
  "token": string
}
```
- Request body: 
```
{
  "title": string,
  "province" : string,
  "city" : string ,
  "date_plan": date,
  "itinerary": string,
  "transportation": string,
  "equipment": string,
  "budget": integer
}
```
- Response:
```
200:
{
  "id": integer,
  "title": string,
  "province" : string,
  "city" : string ,
  "date_plan": date,
  "itinerary": string,
  "transportation": string,
  "equipment": string,
  "budget": integer,
  "createdAt": date,
  "updatedAt": date
}
404:
{
  "err": {
    "code": 404,
    "message": "plan not found"
  },
  "msg": "plan not found"
}
500:
```

## DELETE/plan/:id
- Request header:
```
{
  "token": string
}
```
- Request body: 
```
null
```
- Response: 
```
200:
{
  "id": integer,
  "title": string,
  "province" : string,
  "city" : string ,
  "date_plan": date,
  "itinerary": string,
  "transportation": string,
  "equipment": string,
  "budget": integer,
  "createdAt": date,
  "updatedAt": date
}

500:{errors}
```

## POST/login
- Request header:
```
null
```
- Request body: 
```
{
  "username": string,
  "email": string,
  "password": string
}
```
- Response: 
```
200:
{
  "username": string,
  "email": string,
  "password": string
}

400:
{
  {
  "err": {
    "code": 404,
    "message": 
    [
      "email format is wrong",
      "email or username is wrong"
    ]
  }
}
}

500:{errors}
```

## POST/register
- Request header:
```
null
```
- Request body: 
```
{
  "email": string,
  "password": string
}
```
- Response: 
```
200:
{
  "username": string,
  "email": string,
  "password": string
}

400:
{
  {
  "err": {
    "code": 404,
    "message": 
    [
      "email format is wrong",
      "email must be filled",
      "username must be filled",
      "password must be filled"
    ]
  }
}
}

500:{errors}
```

