const fs = require('fs');
const resourceName = GetCurrentResourceName();
const path = GetResourcePath(resourceName);

if(fs.existsSync(path+'/JSON files/backup') == false){
    try {
        fs.mkdirSync(path+'/JSON files/backup', { recursive: true });
    } catch(error){
        console.log("Error while creating backup directory\n", error);
    }

}

if(fs.existsSync(path+'/JSON files/door_data.json')){
    let files = fs.readdirSync(path+'/JSON files/backup/');

    if(files.length > 7){
        let oldestFile = files.reduce((oldest, file) => {
            return file < oldest ? file : oldest;
        }, files[0]);

        fs.unlinkSync(path+'/JSON files/backup/'+oldestFile);
    }
    fs.copyFileSync(path+'/JSON files/door_data.json', path+'/JSON files/backup/'+Date.now()+'.json');
}

fs.mkdirSync(path+'/sounds/', { recursive: true });
fs.readdir(path+'/sounds/', {withFileTypes: true}, (err, files) => {
    if(err) throw err;

    let fileNames = [];

    files.forEach(file => {

        if(!file.name.startsWith("_"))
            fileNames.push(file.name);
    });
    emit("cd_doorlock:GetSoundFiles", fileNames);

    return;
});

if(!fs.existsSync(path+'/JSON files/import_locations/')){
    try{
     fs.mkdirSync(path+'/JSON files/import_locations/', { recursive: true });
    }catch(error){
        console.log("Error while creating import_locations directory\n", error);
    }

}

if(!fs.existsSync(path+'/JSON files/location_groups.json')){
    try {
        fs.writeFileSync(path+'/JSON files/location_groups.json', '[]');
    } catch(error){
        console.log("Error while creating location_groups.json\n", error);
    }

}

if(!fs.existsSync(path+'/JSON files/door_data.json')){
    try {
        fs.writeFileSync(path+'/JSON files/door_data.json', '[]');
    } catch(error) {
        console.log("Error while creating door_data.json\n", error);
    }

}

try {
fs.readdir(path+'/JSON files/import_locations/', {withFileTypes: false}, (err, files) => {
    if(err) {
        console.error("Error while reading import locations", err);
        return;
    };

    let fileNames = [];

    files.forEach(file => {
        let data = JSON.parse(fs.readFileSync(path+'/JSON files/import_locations/'+file, {encoding: 'utf8', flag:"r"}));

        fileNames.push({
            name: file,
            data: data.data,
            imported: data.imported
        });
    });

    emit("cd_doorlock:GetImportData", fileNames);

    return;
});
} catch(error){
   console.error("Error while reading import locations", error);
}
