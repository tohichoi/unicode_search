# Why README?

For the record

# Show me how it looks!

![Screenshot from 2023-01-29 22-59-58](https://user-images.githubusercontent.com/10368601/215333827-f42b0149-2662-40be-ba35-a5b24b01d1a1.png)

# What is it?

Searching unicode by its name using web browser without internet connection.

# Why did I do?

  - Need unicode symbols for writing documents.
  - Learn modern UX design
    - browser-based desktop app (electron)
    - vanilla javascript modules
  - Learn app containerization
  - Experiment system design: full stack with RESTful API and JS 
    - RESTful API 
      - partially retrieve query results
      - authenticate with tokens (no user interaction)
  - User preference adaptation
    - retrieve query results having user peference

# How to use it?

  1. `docker-compose up`
  2. visit 'http://localhost:8002' 

# Features

  - search as you type
  - copy clicked unicode symbol to the clipboard
  - simple use by containerization 

# System Requirements

  - search and copy symbol with ease
    - copy without mouse dragging, with just click
  - access from anywhere without internet
  - fast search
  - pretty and neat user interface
  - fullfill learning purpose

# System design

## backend

  - RESTful API using django REST framework (https://www.django-rest-framework.org/)
    - basic, token, and session authentication
    - custom pagination
  - sqlite database

## frontend

  - theme using bootstrap v5.2 (https://getbootstrap.com/docs/5.2/getting-started/introduction/)
  - grid layout using mansory (https://masonry.desandro.com/)
  - web interface using Vanilla JS and pure CSS
    - TODO(year 2101) : electron
    - TODO(year 2102) : vue.js
    - TODO(year 2103) : react

# Security

  - Since making app work is primary objective, securing app is out of concern for now. Futhermore, is there anyone who wants it seriously or to commercialize?  
    - Token is hard-coded
    - User name and password is clearly hard-coded with `admin/1234`.
