import express, { Request, Response } from "express";
import mysql,{MysqlError} from "mysql";
import cors from "cors";
 
const app = express();



app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"Test@123",
    database:"fileSystem",
});


app.listen("4000",()=>{
    console.log("Server Running!");
});

app.post("/add",(req:Request,res:Response)=>{
    const name:string = req.body.name;
    const size:number = req.body.size;
    // const uploadedDate = mysql.;
    
    db.query("INSERT INTO files_table (name,size) VALUES (?,?)",[name,size],(err,res)=>{
    if(err){
        console.log(`There is Error ${err}`);
    }
    else{
        console.log("Value Added")
    }
    })
})
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

