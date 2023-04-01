import express, { Request, Response } from "express";
import mysql,{MysqlError} from "mysql";
import cors from "cors";



// Create Express App
const app = express();


// Express App Middlewares to Controlle Fuctions Between Client And DB
app.use(cors());
app.use(express.json());


// Creating MySql DB Connection For The Project
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Test@123",
    database:"fileSystem",
});

// Starting To Listen A Request On Port 4000
app.listen("4000",()=>{
    console.log("Server Running!");
});

// Express App Geting POST Requests From Client And Add File To DB
app.post("/add",(req:Request,res:Response)=>{
    const name:string = req.body.name;
    const size:number = req.body.size;
    
    db.query("INSERT INTO files_table (name,size) VALUES (?,?)",[name,size],(err,res)=>{
    if(err){
        console.log(`There is Error ${err}`);
    }
    else{
        console.log("Value Added")
    }
    })
})

// Express App Geting DELETE Requests From Client And Try To Delete File From DB
app.delete("/deleteFile/:id",(req:Request,res:Response)=>{
    const id:any = req.params.id;
    db.query("DELETE FROM files_table WHERE id = ?",id,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
})

// Express App Geting GET Requests From Client Returns All Files From DB
app.get("/getFiles",(req:Request,res:Response)=>{
    
    
    db.query("SELECT * FROM files_table",(err,result)=>{
    if(err){
        console.log(`There is Error ${err}`);
    }
    else{
        res.send(result)
    }
    })
})

