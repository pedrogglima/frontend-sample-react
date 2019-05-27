Frontend
========

Simple Authentication & CRUD webpage for frontend job's interview. The project was mainly build with HTML, [Material UI](https://material-ui.com/) and [React](https://reactjs.org/), and bundle with the help of [Webpack](https://webpack.js.org/). The project makes use of the API offered by REQ|RES to render fake data on the webpage. You can find more information about the API on their [page](https://reqres.in/).

## How to use

You can run the project throughout the installation process or access the link where the project has been free hosted: [Frontend-React](https://rocky-castle-82785.herokuapp.com/) - it may take some seconds to load the page in the first time because of the Host's policy for free service. It's important to highlight that the project is dependent on the API to render pages that demand data, so those pages won't work if the API is offline. You can check whether the API is offline on their [page](https://reqres.in/).

### Installation

For the installation process is required to install the following programs:

```
Node.js >= 8.10
Npm >= 3.5.2
(Opcional) Version Control System: git
```

After install the requirements:

```
# On your terminal

git clone git://github.com/pedrogglima/frontend-sample-react

# Or in the github page on the option "Clone or Download"

# After downloading the repository, install the project's dependencies.
# Go to inside the directory frontend-sample-react and run on terminal

npm install

# After install, build the production output

npm run postbuild

# then start the server

npm run start:server:exp

# If on your terminal it shows the message "Ready", then the server is up running
# and you can access the app on localhost:8080

# P.s - I had trouble with Firefox CORS (Cross Origin Request Security) policy while
# running the app local due to requests made by the app to the API.
# One option is disable this policy on Firefox;
# A second option would be run the app on Chrome.

```

## Licenses and Copyright

Copyright (C) 2019 Pedro Gabriel Lima.  
