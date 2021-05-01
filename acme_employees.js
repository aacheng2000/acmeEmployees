



const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},  // actually manager id = 3
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

//╔═════════════════════════╗
//   findEmployeeByName 
//╚═════════════════════════╝

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee

function findEmployeeByName(name,employees) {
    for(let i = 0; i<employees.length;i++) {
        if(employees[i].name === name) {
            return employees[i]
        }
    }
    return "hahah you screwed up your code!"
}

console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')

//╔═════════════════════════╗
//      findManagerFor 
//╚═════════════════════════╝
function findManagerFor(id2,employee){

for(let i = 0; i<employee.length;i++){
  if(id2.managerId === employee[i].id) {return employee[i]}
}
   
}

//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
//╔═════════════════════════╗
//     findCoworkersFor 
//╚═════════════════════════╝

function findCoworkersFor(employee,employees){
  //Strategy: grab the manager id from employee
  //Then grab all the employees with that manager 
  result = []
  for(let i = 0;i<employees.length;i++){
    if(employees[i].managerId === employee.managerId) {
      result.push(employees[i])
    }
  }
  return result
}

console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

//spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
//╔═════════════════════════════════════╗
//     findManagementChainForEmployee
//╚═════════════════════════════════════╝
function findManagementChainForEmployee(employee,employees){
  //Strategy
  //return {employee's manager,employee}
  //when to stop? when there is no employee's manager
  //let employeesManager = findManagerFor(employee)
  //employee.unshift(findManagerFor)

  let arr = [employee]

    nextEmployee = arr[0]

    while(nextEmployee.managerId != undefined){
      arr.unshift(findManagerFor(nextEmployee,employees))
      nextEmployee = arr[0]
    }
    
   // arr.unshift(findManagerFor(employee, employees))
   // nextEmployee = arr[0]
   // if(nextEmployee != undefined){arr.unshift(findManagerFor(nextEmployee,employees))}
   // nextEmployee = arr[0]
    //if(nextEmployee != undefined){arr.unshift(findManagerFor(nextEmployee,employees))}


 
  return arr
}
//console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
//spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
//spacer('');
//spacer('findManagementChain for harpo')
//console.log(findManagementChainForEmployee(findEmployeeByName('harpo', employees), employees));

spacer('');
//spacer('findManagementChain for lucy')
//console.log(findManagementChainForEmployee(findEmployeeByName('lucy', employees), employees));


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
//╔══════════════════════════════╗
//     generateManagementTree
//╚══════════════════════════════╝
function generateManagementTree(employees){
// { id: 1, name: 'moe', reports: [{id:2, name: larry, managerId: 1, reports: []}]}
//  let obj = {}
 // for(let i = 0;i<employees.length;i++) {/
//    element = employees[i]
//    console.log(element)
//  }
//  obj.id = 2
//  return obj

return getChildren(superManager,employees)

}

const simpleEmployees = [
{ id: 4, name: 'shep', managerId: 2},
{ id: 8, name: 'shep Jr.', managerId: 4}
];

superManager = { id: 4, name: 'shep', managerId: 2}
superManager = { id: 5, name: 'groucho', managerId: 4}
superManager = { id: 1, name: 'moe'}

function getChildren(employee, employees) {
  //console.log(employees)
  let obj = employee
  let reports = []
  //get reports, and just put them in an array
  for(let i = 0; i<employees.length; i++) {
    if(employee.id === employees[i].managerId) {
      reports.push(getChildren(employees[i],employees))
    }
  }
  obj.reports = reports
  return obj
}


//console.log('----------------')
//console.log(getChildren(superManager,employees))



//console.log(generateManagementTree(simpleEmployees))

//console.log('--------------------')

// start with shep. his id = 4. 

//const employees = [
//  { id: 1, name: 'moe'},
//  { id: 2, name: 'larry', managerId: 1},
//  { id: 4, name: 'shep', managerId: 2},
//  { id: 3, name: 'curly', managerId: 1},
//  { id: 5, name: 'groucho', managerId: 3},
//  { id: 6, name: 'harpo', managerId: 5},
//  { id: 8, name: 'shep Jr.', managerId: 4},
//  { id: 99, name: 'lucy', managerId: 1}
//];

console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{ // none
  "id": 1,
  "name": "moe",
  "reports": [
    { // 1
      "id": 2,
      "name": "larry",
      "managerId": 1, 
      "reports": [
        { // 2
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            { //3
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            } //2
          ]
        } //1
      ]
    }, //none
    { //1
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
//╔═════════════════════════════╗
//     displayManagementTree
//╚═════════════════════════════╝

function displayManagementTree(text) {
  let dashes
  //rule 1: moe gets no dashes
  //rule 2: if you see a {, counter ++
  //rule 3: if you see a }, counter --
  //rule 4: if you see name, then grab it using parsing
  let string = JSON.stringify(text, null, 2)
  counter = -1
  for(let i = 0;i<string.length;i++){
    if(string[i]==='{') {counter++}
    if(string[i]==='}') {counter--}
    if(string.slice(i,i+4)==='name'){
      let usedName = ''
      let hitComma = false
      for(let j = i+8;j<i+40;j++) {
        if (hitComma === false) {usedName+= string[j]}
        if (string[j+2]===",") {hitComma = true}
      }
      dashes = ''
      for(let k = 0;k<counter;k++){dashes+='-'}
      console.log(dashes  + usedName)
      }
    
  }
  //console.log(string)
  //return string
}


displayManagementTree(generateManagementTree(employees));/*



moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/