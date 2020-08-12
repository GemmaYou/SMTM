import {convertDate, daysago} from "./lib.js";

test ("Test convertDate Function", ()=>{
  expect(convertDate("2020-08-03T22:58")).toBe("2020/8/3");
  expect(convertDate("2020-09-11")).toBe("2020/9/11");
})

test ("Test daysago Function", ()=>{
  expect(daysago(2)).toBe("2020/8/9");
  expect(daysago(0)).toBe("2020/8/11");
})
