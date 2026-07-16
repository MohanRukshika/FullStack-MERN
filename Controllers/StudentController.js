import Student from "../models/student.js";

export async function createStudent(req,res){
    console.log(req.user);
    try{

        if(req.user==null){
        res.json({
            message:"Unauthorized Access you need to login before creating student"
        })
        return
    }

    if(!req.user.isAdmin){
        res.json({
            message:"Only admins can create students"
        })
        return
    }

        const newStudent= new Student(
            {
                name:req.body.name,
                age:req.body.age,
                city:req.body.city
            }
        );


        await newStudent.save();

        res.json({
            message:"Student created successfully"
        })
    }catch(error){
        console.log("Student Creation Failed",error);
    }

}

export function getStudents(req,res){
    Student.find().then(
        (Student)=>{
            console.log(Student);
        }
    ).catch((error)=>{
        console.log("Couldn't find student")
    })
}