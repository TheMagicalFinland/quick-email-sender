const reply = require("readline-sync");
const nodemailer = require("nodemailer");
const os = require("os");
const setTitle = require("console-title");
setTitle("Email project by TheFinland#0920")

const detailHandler = async(email, password, content, sender, receiver, title) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email, 
      pass: password, 
    },
  });

  let info = await transporter.sendMail({
    from: sender + " <" + email + ">",
    to: receiver,
    subject: title,
    text: content,
  }).catch(e => returnToMainMenu("Failed to send the email.\n\nThis might be caused by an invalid password/username or you have less secure apps turned off, which you can enable at https://myaccount.google.com/lesssecureapps."));
  console.clear()
  returnToMainMenu("Email sent successfully to " + receiver)
}

const main = async() => {
var email = reply.questionEMail("What is your email address? > ")
if(!email.includes("@gmail.com")) returnToMainMenu("Only gmail is allowed.")
var password = reply.question("What is your email password? > ")
if(!password) returnToMainMenu("Invalid password, returned to main menu")
var content = reply.question("What is the message you'd like to send? > ")
if(!content) returnToMainMenu("Invalid message, returned to main menu")
var title = reply.question("What is the title you'd like to add to your message? > ")
if(!title) returnToMainMenu("Invalid title, returned to main menu")
var sender = reply.question("What name would you like to be displayed along with your email address on the message? > ")
if(!sender) returnToMainMenu("Invalid display name, returned to main menu")
var receiver = reply.questionEMail("Who would you like to send this to? > ")
console.log("Working on the email...")
await detailHandler(email, password, content, sender, receiver, title)
}

const returnToMainMenu = async(message) => {
  console.log(message)
  main()
}

const welcomer = async(address) => {
  console.log("Hey there " + os.userInfo().username + "!\nThis little program is made to send an email quickly to the specified receiver. The application was made by me, TheFinland#0920. I was bored when I did this so that's why it's so little.\nBut yeah if you need help with anything, just send me an email to thefinland@cbot.me. Alright, alright! Let's proceed to the questions you need to answer for this to work.\n\nWARNING! Your ip address " + address + " might be vulnerable if you send emails to some unknown addresses.")
  returnToMainMenu("Let's proceed!")
}

getip()
async function getip() {
    var address, ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function (details) {
            return details.family === 'IPv4' && details.internal === false;
        });

        if (iface.length > 0) address = iface[0].address;
    }
    welcomer(address)
}
