//file system package/module
import fs from 'fs';
//path
import path from 'path';
//use path to build a filepath to our data subdirectory
const dataDir = path.join(process.cwd(), 'data');

//function returns ids for all json objects in array
export function getAllIds(){
  const filePath = path.join(dataDir, 'cars.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj = JSON.parse(jsonString);
  const returnedData = jsonObj.map(item=> {
    return{
      params: {
      id: item.id.toString(),
        
      }
    }
  });
  //console.log(returnedData);
  return returnedData;
}

//function returns names and ids for all json objects in array,sorted by name property
export function getSortedList(){
  const filepath = path.join( dataDir,"cars.json");
  
  const jsondata = fs.readFileSync(filepath,"utf8");

  const jsonObj = JSON.parse( jsondata );

  jsonObj.sort(
    function(a,b){
      return a.name.localeCompare(b.name);
    }
  );
  //use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return{
      id: item.id.toString(),
      name: item.name
    }
  });
}

//async function to get the complete data for just one person
//used by getStaticProps() in [id].js
// called from [id].js getStaticProps() function
export async function getData(idRequested) {
  // get filepath to json file
  const filePath = path.join(dataDir, 'cars.json');
  const filePath2 = path.join(dataDir, 'relations.json');

  // load json file contents
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');

  // convert string from file into json array object
  const jsonObj = JSON.parse(jsonString);
  const jsonObj2 = JSON.parse(jsonString2);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.id.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];

    // find matching owner_id in relations data model
    const objMatch2 = jsonObj2.filter(obj => {
        return obj.owner_id.toString() === idRequested;
      }
    );

    if (objMatch2.length > 0) {
      // since we found an entry in relations, now let's find all the rows
      // of persons that have id in the array of related_ids
      const objMatch3 = jsonObj.filter(obj => {
          return objMatch2[0].related_ids.includes( obj.id );
        }
      );

      if (objMatch3.length > 0) {
        objReturned.related = objMatch3;
      }
    }

  } else {
    objReturned = {};
  }
  
  // console.log(objReturned);

  // return object value found
  return objReturned;
}