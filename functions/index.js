const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
require('dotenv').config();
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const {SENDER_EMAIL, SENDER_PASSWORD} = process.env;

// let testdate =  new Date()
// // console.log(testdate);
// let today = `${testdate.getFullYear()}/${testdate.getMonth() +1 }/${testdate.getDate()}`;
//
// let data ={
//   sevenDays: [],
//   thirtydays: []
// };

let convertDate = (ddate) => {
  let date = new Date(ddate);
  let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`
  return actdate;
}

let DateDiff = function (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
  let oDate1 = new Date(sDate1);
  let oDate2 = new Date(sDate2);
  let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
};

let Daysago = function(days){
  let d = new Date();
  let test = d.setDate(d.getDate()-days);
  let answer = new Date(test);
  let finaldate = `${answer.getFullYear()}/${answer.getMonth() +1 }/${answer.getDate()}`;
  // console.log(finaldate);
  return finaldate
}

let getDate = admin.firestore().collection('activity').where('onlyDate','==',Daysago(0))
.get()
.then(function(querySnapshot) {
      let act = [];
      querySnapshot.forEach(function(doc) {
        console.log(doc.data())
        let data = {
          data: doc.data(),
          id: doc.id
        }
        act.push(data);
      });
      console.log(act)
      return act
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

let getMemberEmail = (data)=>{
  list = data.filter(item => !item.done);
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendEmailEveryday = functions.pubsub.schedule('0 0 * * *')
  .timeZone('Asia/Taipei')
  .onRun((context) => {
    admin.firestore().collection('activity').where('onlyDate','==',Daysago(7))
    .get()
    .then(function(querySnapshot) {
          let act = [];
          querySnapshot.forEach(function(doc) {
            let data = doc.data();
            let authData=nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD
              }
            });

            // email to member
            for (i = 0; i < data.member_details.length; i++){
              if(!data.done){
                if ( data.kind === "once" ){ // email to member for once activity
                  let member = data.member_details[i];
                  authData.sendMail({
                    from:'cashback.official.tw@gmail.com',
                    to: `${data.member_details[i].email}`,
                    subject:`【欠款提醒】${data.name}`,
                    text:`活動：${data.name} 您尚未付款唷！`,
                    html:`<p style="font-size: 15px;">${data.member_details[i].name} ，您好<br/>
                    <br/>
                    您有欠款 NT$${member.perValue} 尚未繳清，請儘速還款，謝謝！<br/>
                    另，提供您主揪 ${data.holder.name} 之聯絡資訊： ${data.holder.email}。<br/>
                    更多細節請至 <a href="https://smtm-5618c.web.app/#/">CashBack 官網</a> 確認。</p>
                    <p style="font-size:12px;color: grey">**此為系統自動通知，請勿回覆此信件！</p>`,
                  })
                  .then(res=>console.log("successfully send email to member, 7 days, once"))
                  .catch(err=>console.log(err));
                } else if ( data.kind === "period" ){ // email to member for period activity
                  if( data.period === "week"){
                    let member = data.member_details[i];
                    authData.sendMail({
                      from:'cashback.official.tw@gmail.com',
                      to: `${data.member_details[i].email}`,
                      subject:`【繳款提醒】${data.name}`,
                      text:`活動：${data.name} 繳款提醒！`,
                      html:`<p style="font-size: 15px;">${data.member_details[i].name} ，您好<br/>
                      <br/>
                      提醒您繳納每週費用 NT$${member.perValue} 謝謝！<br/>
                      另，提供您主揪 ${data.holder.name} 之聯絡資訊： ${data.holder.email}。<br/>
                      更多細節請至 <a href="https://smtm-5618c.web.app/#/">CashBack 官網</a> 確認。</p>
                      <p style="font-size:12px;color: grey">**此為系統自動通知，請勿回覆此信件！</p>`,
                    })
                    .then(res=>console.log("successfully send email to member, 7 days, period"))
                    .catch(err=>console.log(err));
                  }
                }
              }
            }

            // email to holder
            if (!data.done){
              if ( data.kind === "once" ){
                let member = data.member_details.filter(item => !item.done);
                if (member.length > 0){
                  let htmlList = member.map((m,i)=>{
                    return (`<tr><td style="border-bottom:1px solid #133E4D; width:50%; text-align:center; height:28px;"">${m.name}</td><td style="border-bottom:1px solid #133E4D; width:50%; text-align:center; height:28px;">${m.perValue}</td></tr>`)
                  })
                  authData.sendMail({
                    from:'cashback.official.tw@gmail.com',
                    to: `${data.holder.email}`,
                    subject:`【活動提醒】${data.name} `,
                    text:`活動：${data.name} 的這些人尚未還款唷！`,
                    html: `<p style="font-size: 15px;">${data.holder.name} ，您好<br/>
                    <br/>
                    以下為尚未還款之用戶，稍早皆已寄出還款提醒。<br/>
                    更多細節請至 <a href="https://smtm-5618c.web.app/#/">CashBack 官網</a> 確認！</p>
                    <table style="width:300px; border-collapse:collapse; border:1px solid #133E4D; font-size: 15px;"><tbody><tr><th style="border-bottom:1px solid #133E4D; width:50%; height:28px; background-color: #133E4D; color: white;">用戶</th><th style="border-bottom:1px solid #133E4D; width:50%; height:28px; background-color: #133E4D; color: white;">欠款 (NT$)</th></tr>${htmlList.join('')}</tbody></table>
                    <br/>
                    <p style="font-size:12px;color: grey">**此為系統自動通知，請勿回覆此信件！</p>`,
                  })
                  .then(res=>console.log("successfully send email to holder, 7days, once"))
                  .catch(err=>console.log(err));
                }
              } else if ( data.kind === "period" ){
                  if( data.period === "week"){
                    let member = data.member_details.filter(item => !item.done);
                    if (member.length > 0){
                      let htmlList = member.map((m,i)=>{
                        return (`<tr><td style="border-bottom:1px solid #133E4D; width:50%; text-align:center; height:28px;"">${m.name}</td><td style="border-bottom:1px solid #133E4D; width:50%; text-align:center; height:28px;">${m.perValue}</td></tr>`)
                      })
                      authData.sendMail({
                        from:'cashback.official.tw@gmail.com',
                        to: `${data.holder.email}`,
                        subject:`【活動提醒】${data.name} `,
                        text:`活動：${data.name} 繳款日已到！`,
                        html:`<p style="font-size: 15px;">${data.holder.name} ，您好<br/>
                        <br/>
                        以下為目前有參加活動之用戶，稍早皆已寄出繳款提醒。<br/>
                        更多細節請至 <a href="https://smtm-5618c.web.app/#/">CashBack 官網</a> 確認！</p>
                        <table style="width:300px; border-collapse:collapse; border:1px solid #133E4D; font-size: 15px;"><tbody><tr><th style="border-bottom:1px solid #133E4D; width:50%; height:28px; background-color: #133E4D; color: white;">用戶</th><th style="border-bottom:1px solid #133E4D; width:50%; height:28px; background-color: #133E4D; color: white;">欠款 (NT$)</th></tr>${htmlList.join('')}</tbody></table>
                        <br/>
                        <p style="font-size:12px;color: grey">**此為系統自動通知，請勿回覆此信件！</p>`,
                      })
                      .then(res=>console.log("successfully send email to holder, 7days, period"))
                      .catch(err=>console.log(err));
                    }
                  }
              }
            }
          })
        return act
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    admin.firestore().collection('activity').where('onlyDate','==',Daysago(30))
    .get()
    .then(function(querySnapshot) {
          let act = [];
          querySnapshot.forEach(function(doc) {
            let data = doc.data();
            let authData=nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD
              }
            });

            // email to member for period activity , 30 days
            for (i = 0; i < data.member_details.length; i++){
              if(!data.done){
                if ( data.kind === "period" ){ // email to member for period activity
                  if( data.period === "month"){
                    let member = data.member_details[i];
                    authData.sendMail({
                      from:'cashback.official.tw@gmail.com',
                      to: `${data.member_details[i].email}`,
                      subject:`【繳款提醒】${data.name}`,
                      text:`活動：${data.name} 繳款提醒！`,
                      html:`<p style="font-size: 15px;">${data.member_details[i].name} ，您好<br/>
                      <br/>
                      提醒您繳納每月費用 NT$${member.perValue} 謝謝！<br/>
                      另，提供您主揪 ${data.holder.name} 之聯絡資訊： ${data.holder.email}。<br/>
                      更多細節請至 <a href="https://smtm-5618c.web.app/#/">CashBack 官網</a> 確認。</p>
                      <p style="font-size:12px;color: grey">**此為系統自動通知，請勿回覆此信件！</p>`,
                    })
                    .then(res=>console.log("successfully send email to member, 30 days, period"))
                    .catch(err=>console.log(err));
                  }
                }
              }
            }

            // email to holder
            if (!data.done){
              if ( data.kind === "period" ){
                  if( data.period === "month"){
                    let member = data.member_details.filter(item => !item.done);
                    if (member.length > 0){
                      let htmlList = member.map((m,i)=>{
                        return (`<tr><td style="border-bottom:1px solid #133E4D; width:50%; text-align:center; height:28px;"">${m.name}</td><td style="border-bottom:1px solid #133E4D; width:50%; text-align:center; height:28px;">${m.perValue}</td></tr>`)
                      })
                      authData.sendMail({
                        from:'cashback.official.tw@gmail.com',
                        to: `${data.holder.email}`,
                        subject:`【活動提醒】${data.name} `,
                        text:`活動：${data.name} 的這些人尚未還款唷！`,
                        html:`<p style="font-size: 15px;">${data.holder.name} ，您好<br/>
                        <br/>
                        以下為目前有參加【${data.name}】之用戶，稍早皆已寄出繳款提醒。<br/>
                        更多細節請至 <a href="https://smtm-5618c.web.app/#/">CashBack 官網</a> 確認！</p>
                        <table style="width:300px; border-collapse:collapse; border:1px solid #133E4D; font-size: 15px;"><tbody><tr><th style="border-bottom:1px solid #133E4D; width:50%; height:28px; background-color: #133E4D; color: white;">用戶</th><th style="border-bottom:1px solid #133E4D; width:50%; height:28px; background-color: #133E4D; color: white;">欠款 (NT$)</th></tr>${htmlList.join('')}</tbody></table>
                        <br/>
                        <p style="font-size:12px;color: grey">**此為系統自動通知，請勿回覆此信件！</p>`,
                      })
                      .then(res=>console.log("successfully send email to holder, 30days, period"))
                      .catch(err=>console.log(err));
                    }
                  }
              }
            }

          });
        return act
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
})
//
//       });
//
//   console.log('This will every 00:00 !');
//   return null;
// });

// exports.sendEmailNotification = functions.firestore.document('activity/{docId}')
// .onWrite((change, context)=>{
//   const data = change.after.data();
//   const id = context.params.docId;
//
//   console.log(change.after.data());
//   console.log(id);
//
//   return null;
//
//   let authData=nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: SENDER_EMAIL,
//       pass: SENDER_PASSWORD
//     }
//   });
//
//   authData.sendMail({
//     from:'cashback.official.tw@gmail.com',
//     to:`${data.email}`,
//     subject:'Your submission success',
//     text:`${data.email}`,
//     html:`${data.email}`,
//   })
//   .then(res=>console.log("successfully send submit email"))
//   .catch(err=>console.log(err));
// });
//
// exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 0 * * *')
//   .timeZone('Asia/Taipei')
//   .onRun((context) => {
//     data.sevenDays = getDate;
//   console.log(getDate);
//   console.log('This will every 5 minutes!');
//   console.log(sevenDays);
//   console.log(act);
//   return null;
// });
