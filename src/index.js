import React from 'react';
// importing react in our application
// ReactDom package
import ReactDOM from 'react-dom/client';
//import index.css
import "./index.css";

const name = "abcd"
function Greeting() {
  // Component returns an jsx file

  // using js inside jsx using {}
  const title = "micro"
  return (
    <>
    <h2>Hello World</h2>
    <Componentone/>
    <Componenttwo/>
    <h3> {title} </h3>
    <h3> {name} </h3>
    <h3> {6+6} </h3>

    </>
  );
}

// Behing the scene how it works?

// // jsx will call a function that is createElement
// // inside fun createElement('3 parameter')
// // 1) Elements need to be displayed h2 ele? or div?...?
// // 2)Empty object or called props
// // 3)What needs to be displayed inside the element

// function Greeting() {
//   return React.createElement('h2',{},'hello this is jsx');
// }

// If there are more than one component
function Componentone() {
  return <p className="component-one"> The contents of component1 </p>
}

// inline css
function Componenttwo(){
  return <p style = {{color:'green',fontSize:'2rem'}}> The contents of component2 </p>
}

// using resctDom we call the component
// render is a method that takes two parameter
// 1)What needs to be rendered
// 2)Where it should be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Greeting />);

