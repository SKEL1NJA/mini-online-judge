const fs=require("fs");
const {exec}=require("child_process");

module.exports=function(code,problem){

return new Promise((resolve)=>{

    const file="submissions/code.cpp";

    fs.writeFileSync(file,code);

    /* compile */
    exec(`g++ ${file} -o submissions/code`,(err)=>{

        if(err){
            resolve("Compilation Error");
            return;
        }

        /* run */
        exec(`submissions/code.exe`,{input:problem.input},(err,stdout)=>{

            if(err){
                resolve("Runtime Error");
                return;
            }

            if(stdout.trim()==problem.output.trim())
                resolve("Accepted");
            else
                resolve("Wrong Answer");
        });

    });

});
};