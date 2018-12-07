const incident = [
    {
     id : 1 ,
     createdOn : "May 2097" ,
     createdBy : 1 , // represents the user who created this record
     type : "red-flag" , // [red-flag, intervention]
     location : "lat 86 long 7" , // Lat Long coordinates
     status : "draft" , // [draft, under investigation, resolved, rejected]
     images : ["cow.png", "image.png"] ,
     videos : ["now.mp4", "image.mp4"] ,
     comment : "noice"
    }

];

export default incident;
