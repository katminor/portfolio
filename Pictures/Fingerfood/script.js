const width = 1200;
const height = 600;

// THIS IS THE BG
const bg = d3.select("#bg");

const bearHead = d3.select("#bearHead");

let settings = {
    species: {
        options: ["#bear", "#frog", "#penguin", "#cat", "#elephant", "#rat"],
        names: ["Bear Buddy", "Frog Friend", "Penguin Pal", "Cat Companion", "Elephant Equal", "Rat Rolemodel"],
        selection: 0
    },
    backgrounds: {
        options1: ["#bg1", "#bg2", "#bg3", "#bg4"],
        options2: ["#fg1", "#fg2", "#fg3", "#fg4"],
        names: ["Windmills", "Water lilies", "Arctic", "Cabin"],
        selection: 0
    },
    drinks: {
        options: ["#none", "#drink1", "#drink2", "#drink3", "#drink4"],
        names: ["Drinks", "Boba", "Coffee", "Juice", "Milkshake"],
        selection: 0
    },
    hats: {
        options: ["#none", "#hat1", "#hat2", "#hat3", "#hat4"],
        names: ["Hats", "UFO", "Partyhat", "Tophat", "Bowtie"],
        selection: 0
    }
}

//THIS CHANGES SPECIES
d3.select("#species").on("click", function(){
    settings.species.options.forEach(function(d){
        d3.select(d).attr("opacity", 0);
    });
    //This makes the current visible model invisible
    settings.species.selection++;
    settings.species.selection %= settings.species.options.length;
    // this increases the selection value and resets the value back to 0 
    //once it gets to the length ofthe array of options
    d3.select(settings.species.options[settings.species.selection]).attr("opacity", 1);
    //this makes the current selection invisible
    d3.select("#species").html(`<span>${settings.species.names[settings.species.selection]}</span>`);
    //this updates the button with the name of the friend
});

//THIS CHANGES BG
d3.select("#backgrounds").on("click", function(){
    settings.backgrounds.options1.forEach(function(d){
        d3.select(d).attr("opacity", 0);
    });
    //This makes the opacity of all of the backgrounds 0
    settings.backgrounds.options2.forEach(function(d){
        d3.select(d).attr("opacity", 0);
    });
    //This makes the opacity of all the foregrounds 0
    settings.backgrounds.selection++;
    settings.backgrounds.selection %= settings.backgrounds.options1.length;
    //this increases the selection value and resets the value back to 0
    //once it gets to the length of the array of options1 (same length as options 2)
    d3.select(settings.backgrounds.options1[settings.backgrounds.selection]).attr("opacity", 1);
    d3.select(settings.backgrounds.options2[settings.backgrounds.selection]).attr("opacity", 1);
    
    d3.select("#backgrounds").html(`<span>${settings.backgrounds.names[settings.backgrounds.selection]}</span>`);
});

//THIS CHANGES DRINK
d3.select("#drinks").on("click", function(){
    settings.drinks.options.forEach(function(d){
        d3.select(d).attr("opacity", 0);
    });
    //this makes the opacity of all the drinks 0
    settings.drinks.selection++;
    settings.drinks.selection %= settings.drinks.options.length;

    d3.select(settings.drinks.options[settings.drinks.selection]).attr("opacity", 1);

    d3.select("#drinks").html(`<span>${settings.drinks.names[settings.drinks.selection]}</span>`);
});

//THIS CHANGES HAT
d3.select("#hats").on("click", function(){
    settings.hats.options.forEach(function(d){
        d3.select(d).attr("opacity", 0);
    });

    settings.hats.selection++;
    settings.hats.selection %= settings.hats.options.length;


    d3.select(settings.hats.options[settings.hats.selection]).attr("opacity", 1);

    d3.select("#hats").html(`<span>${settings.hats.names[settings.hats.selection]}</span>`);
});

//THIS ANIMATES CLOUD 1
let cloud1 = d3.select("#cloud1");
let cloud1Anim = function(){
    let cloudHeight = Math.random() * 250;
    cloud1.attr("transform", `translate(-250, ${cloudHeight})`);
    cloud1.transition()
        .delay(Math.random() * 500 + 500)
        .duration(Math.random() * 8000 + 6000)
        .attr("transform", `translate(600, ${cloudHeight})`)
        .ease(d3.easeLinear)
        .on("end", cloud1Anim);
};
cloud1Anim();

//THIS ANIMATES CLOUD 2
let cloud2 = d3.select("#cloud2");
let cloud2Anim = function(){
    let cloudHeight = Math.random() * 250;
    cloud2.attr("transform", `translate(-250, ${cloudHeight})`);
    cloud2.transition()
        .delay(Math.random() * 3000 + 500)
        .duration(Math.random() * 8000 + 6000)
        .attr("transform", `translate(600, ${cloudHeight})`)
        .ease(d3.easeLinear)
        .on("end", cloud2Anim);
};
cloud2Anim();

//THIS ANIMATES CLOUD 3
let cloud3 = d3.select("#cloud3");
let cloud3Anim = function(){
    let cloudHeight = Math.random() * 200 + 50;
    cloud3.attr("transform", `translate(-250, ${cloudHeight})`)
    cloud3.transition()
        .delay(Math.random() * 500 + 500)
        .duration(Math.random() * 8000 + 6000)
        .attr("transform", `translate(600, ${cloudHeight})`)
        .ease(d3.easeLinear)
        .on("end", cloud3Anim);
}
cloud3Anim();

//THIS ANIMATES CLOUD 4
let cloud4 = d3.select("#cloud4");
let cloud4Anim = function(){
    let cloudHeight = Math.random() * 250 + 50;
    cloud4.attr("transform", `translate(-250, ${cloudHeight})`)
    cloud4.transition()
        .delay(Math.random() * 3000 + 500)
        .duration(Math.random() * 8000 + 6000)
        .attr("transform", `translate(600, ${cloudHeight})`)
        .ease(d3.easeLinear)
        .on("end", cloud4Anim);
}
cloud4Anim();

const colors = ["tomato", "lightseagreen", "orange", "dodgerblue", "blueviolet"];
//this is an array of the possible color names of the food


let foodAnim = function(){
    d3.select("#food").remove();
    let numCircles = Math.random() * 10 + 5
    let data = [];
    for(var i = 0; i < numCircles; i++){
        let x = Math.random() * 500 + 50;
        let r = Math.random() * 15 + 10;
        let c = colors[Math.floor(Math.random() * 5)];
        let o = {xPosition: x, radius: r, colors: c};
        data.push(o);
    }
    console.log(data);
    d3.select("#bg").append("g").attr("id", "food");
    let food = d3.select("#food").selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d){ return d.xPosition; })
            .attr("cy", 25)
            .attr("r", function(d){ return d.radius; })
            .attr("fill", function(d){ return d.colors; });

    food.transition()
        .duration(function(d){ return 10000 - (d.radius / 25) * 2000; })
        .ease(d3.easeBounce)
        .attr("cy", 595)
        .on("end", function(){ d3.select("#feedMe").html(`<span>FEED ME</span>`); });

    food.on("mouseover", function(){
        d3.select(this).attr("opacity", 0).remove();
    });
}

d3.select("#feedMe").on("click", function(){
    d3.select("#feedMe").html(`<span>GET THE FOOD!!!</span>`);
    foodAnim();
});

