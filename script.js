let tl = gsap.timeline();
tl.from("#nav", {
    y: -20,
    opacity: 0,
    duration: 1.2,
    ease: Expo.easeInOut
})
 .to(".bounding>h1, .bounding>h3, .bounding>p", {
    transform: `translateY(0%)`,
    duration: 1,
    ease: Power3,
    delay: -0.5,
    stagger: 0.2
})
.from("#page1footer", {
    y:10,
    duration: 1,
    delay: -0.95,
    opacity: 0,
    ease: Expo.easeInOut
})

document.querySelectorAll("#page1footer a").forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        document.querySelector("#cursor").style.height = '30px';
        document.querySelector("#cursor").style.width = '30px';
        document.querySelector("#cursor").style.border = `2px solid #fff`;
        document.querySelector("#cursor").style.backgroundColor = 'transparent';
    })
    elem.addEventListener("mouseleave", function(){
        document.querySelector("#cursor").style.height = '10px';
        document.querySelector("#cursor").style.width = '10px';
        document.querySelector("#cursor").style.border = `0px solid black`;
        document.querySelector("#cursor").style.backgroundColor = 'white';
    })
})

function mouseSkew(){
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout('initialStateCursor')
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

       let initialStateCursor =  setTimeout(() => {
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

document.querySelectorAll(".textcontainer").forEach(function(elem){
    elem.addEventListener("mousemove", function(dets){
        let diff = dets.clientY - elem.getBoundingClientRect().top;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX
        })
    })
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power1
        })
    })
})

mouseSkew()
circleMouseFollower()