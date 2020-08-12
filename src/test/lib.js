function convertDate(ddate){
  let date = new Date(ddate);
  let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`
  return actdate;
}

function daysago(days){
  let d = new Date();
  let test = d.setDate(d.getDate()-days);
  let answer = new Date(test);
  let finaldate = `${answer.getFullYear()}/${answer.getMonth() +1 }/${answer.getDate()}`;
  return finaldate
}

export {convertDate, daysago};
