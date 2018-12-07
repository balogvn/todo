import express from 'express';
import db from './db/db2';
import bodyParser from 'body-parser';


// Set up the express app
const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all incidents
app.get('/api/v1/incident', (req, res) => {
  res.status(200).send({
   
    incident: db
  })
});


app.post('/api/v1/incident', (req, res) => {
   if(!req.body.createdBy) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  } else if(!req.body.createdBy) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }	






 const incident = {
   id: db.length + 1,
   createdOn: req.body.createdOn,
   createdBy: req.body.createdBy,
   type: req.body.type,
   location: req.body.location,
   status: req.body.status,
   images: req.body.images,
   videos: req.body.videos,
   comment: req.body.comment

 }
 console.log (req.body)

 




 db.push(incident);
 return res.status(201).send({
   success: 'true',
   message: 'incident added successfully',
   incident,
 })
});




app.get('/api/v1/incident/:id', (req, res) => {

  const id = parseInt(req.params.id, 10);

  db.map((incident) => {

    if (incident.id === id) {

      return res.status(200).send({

        success: 'true',

        message: 'incident retrieved successfully',

        incident,

      });

    } 

});
 return res.status(404).send({

   success: 'false',

   message: 'incident does not exist',

  });

});

app.delete('/api/v1/incident/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((incident, index) => {
    if (incident.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'incident deleted successfuly',
       });

    }
  });


    return res.status(404).send({
      success: 'false',
      message: 'incident not found',
    });

 
});

app.put('/api/v1/incident/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let incidentFound;
  let itemIndex;
  db.map((incident, index) => {
    if (incident.id === id) {
      incidentFound = incident;
      itemIndex = index;
    }
  });

  if (!incidentFound) {
    return res.status(404).send({
      success: 'false',
      message: 'incident not found',

    });
  }

  

  const updatedIncident = {
    id: incidentFound.id,
    createdOn: incidentFound.createdOn,
    createdBy: incidentFound.createdBy,
    type: incidentFound.type,
    location: incidentFound.location,
    status: incidentFound.status,
    images: incidentFound.images,
    videos: incidentFound.videos,
    comment: incidentFound.comment,
    id: req.body.id || incidentFound.id,
    createdOn: req.body.createdOn || incidentFound.createdOn,
    createdBy: req.body.createdBy || incidentFound.createdBy,
    type: req.body.type || incidentFound.type,
    location: req.body.location || incidentFound.location,
    status: req.body.status|| incidentFound.status,
    images: req.body.images || incidentFound.images,
    videos: req.body.videos || incidentFound.videos,
    comment: req.body.comment || incidentFound.comment,
  

  };

  db.splice(itemIndex, 1, updatedIncident);

  return res.status(201).send({
    success: 'true',
    message: 'incident added successfully',
    updatedIncident,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});