const fs = require('fs');
const path = require('path');

console.log(__dirname,__filename,process.cwd());
const jsReg = /^.+\.js$/;
const sourcePath = path.resolve(__dirname,'src/logic');
const libPath = path.resolve(__dirname,'lib');
const targetPath = path.resolve(process.cwd(),'node_modules/logic');

function copy(){
    if(!fs.existsSync(path.resolve(process.cwd(),'node_modules'))) return;
    if(!fs.existsSync(path.resolve(process.cwd(),'node_modules/logic'))){
        fs.mkdir(targetPath,(err)=>{
            if(!err){
                console.log('创建logic成功');
                copyLib();
                copySource();
            }
        });
    }else{
        copyLib();
        copySource();
    }
}

function copyLib() {
    copyFiles(libPath,[],fs.readdirSync(libPath),1);
}


function copySource(){
    copyFiles(sourcePath,[],fs.readdirSync(sourcePath),0);
}

function copyFiles(prefix,joins,files,flag){
    files.filter((v) => flag ? true : !jsReg.test(v))
        .forEach((file) => {
            let filePath = path.resolve(prefix, joins.join('/'),file);
            if(fs.statSync(filePath).isDirectory()){
                copyFiles(prefix,[...joins, file],fs.readdirSync(filePath),flag);
            }else{
                let data = fs.readFileSync(filePath);
                writeFile(file,joins,data);
            }
        })
}

function writeFile(file,joins,data){
    let curPath = targetPath;
    for(let name of joins){
        curPath = path.resolve(curPath,name);
        if(!fs.existsSync(curPath)){
            fs.mkdirSync(curPath);
        }
    }
    fs.writeFileSync(path.resolve(curPath,file),data);
}

copy();
// fs.writeFileSync(path.resolve(targetPath,'component/default/button/index.styl'),'caonima');