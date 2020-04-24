const express = require("express")
const server = express()

const db = require("./db")


/* const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reiciendis distinctio quis suscipit quae nesciunt deserunt enim ducimus eligendi, doloribus nam est. Omnis nostrum beatae ducimus mollitia praesentium itaque eligendi.",
        url: "http"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercício",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reiciendis distinctio quis suscipit quae nesciunt deserunt enim ducimus eligendi, doloribus nam est. Omnis nostrum beatae ducimus mollitia praesentium itaque eligendi.",
        url: "http"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reiciendis distinctio quis suscipit quae nesciunt deserunt enim ducimus eligendi, doloribus nam est. Omnis nostrum beatae ducimus mollitia praesentium itaque eligendi.",
        url: "http"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaoke",
        category: "Diversão em Familia",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae reiciendis distinctio quis suscipit quae nesciunt deserunt enim ducimus eligendi, doloribus nam est. Omnis nostrum beatae ducimus mollitia praesentium itaque eligendi.",
        url: "http"
    },
] */


server.use(express.static("public"))

server.use(express.urlencoded({extend:true}))

const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: true,
})

server.get("/", function(req, res){

        db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

            const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas){
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
        }
    }

    return res.render("index.html", {ideas: lastIdeas})
    })

    
})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro 404!")
        }
        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", {ideas: reversedIdeas})

    })
})

server.post("/", function(req, res){
       const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    ` 

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ]

    console.log(req.body)

    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro 404!")
            
        }
        
       
        return res.redirect("/ideias")
    }) 

})



server.listen(3000)