

const configParticles =  {
 
 
    "particles": {
        "number": {
            "value": 80,
             
                "density": {
                "enable": true,
                    "value_area": 800
            }
        },
        "color": {
            "value": ["#ccc0c0","#1f1a1a"]
        },
        "shape": {
            "type": "circle",
                "stroke": {
                "width": 0,
                    "color": [
                    "#ffffff",
                    "#fff"]
            },
            "polygon": {
                "nb_sides": 16
            },

        },
        "opacity": {
            "value": 2,
                "random": true,
                "anim": {
                "enable": false,
                    "speed": 20,
                    "opacity_min": 0.1,
                    "sync": false
            }
        },
        "size": {
            "value": 3,
                "random": true,
                "anim": {
                "enable": false,
                    "speed": 1,
                    "size_min": 0.1,
                    "sync": true
            }
        },
        "line_linked": {
            "enable": true,
                "distance": 200,
                "color": ["#faf7f7","#cecece"],
                "opacity": 0.4,
                "width": 1
        },
        "move": {
            "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
            }
        }
    },

    "interactivity": {
        "detect_on": "canvas",
            "events": {
            "onhover": {
                "enable": true,
                    "mode": "grab"
            },
            "onclick": {
                "enable": true,
                    "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 150,
                    "line_linked": {
                    "opacity": 2
                }
            },
            "bubble": {
                "distance": 10,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 0.5
            },
            "repulse": {
                "distance": 200,
                    "duration": 0.1
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect":false
};
export default configParticles;