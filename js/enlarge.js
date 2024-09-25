let images = Array.from(document.querySelectorAll("img"));
//  ================ TO REMOVE THE FIRST ELEMENT ================
// shift
// images.shift();

// splice
// let newArray = images.splice(0,1);
// newArray contains the first element only
// images contains the rest (2nd - last)

// slice doens't modify the original array 
// we can assign the returned array to the original one
images = images.slice(1);

//  ================ END OF REMOVING THE FIRST ELEMENT ================


//  ================ FOR, FOREACH, MAP ================

// using regular for loop
// for (let i = 0; i < images.length; i++) {
//     enlarge(images[i]);
// }

// OR
for (ele in images) enlarge(images[ele]);

// using forEach
// images.forEach((ele) => enlarge(ele));

// using map
// images.map((ele) => enlarge(ele));

//  ================ END OF FOR, FOREACH, MAP ================

function enlarge(element) {
    element.addEventListener("mouseover", (event) => {
        event.target.style.transform = "scale(1.2)";
        event.target.style.transition = "transform 0.3s ease";
    })
    element.addEventListener("mouseout", (event) => {
        event.target.style.transform = "scale(1.0)";
    })
}