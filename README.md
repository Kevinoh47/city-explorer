![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## LAB - React Testing and Deployment (Lab 27)



### Author: Kevin O'Halloran

### Links and Resources
* [repo](https://github.com/Kevinoh47/city-explorer)
* [travis]()
* [AWS](http://lab-27-401.s3-website-us-west-2.amazonaws.com/)


### Modules
#### `app.js`
##### Exported Values and Methods

###### `render() -> React.Fragment`
render returns a section that includes links to add or subtract from the counter, and a span class that contains the counter itself, which is a react state object. 


### Setup

#### Running the app
* `npm start`
* Endpoint: `localhost:3000`

#### Tests
* npm run tests
* assert is alive at application start.
* assert changes state by decrementing the counter when down link is clicked.
* assert changes state by incrementing the counter when up link is clicked. 

#### UML
![UML]()
