const exp = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = exp();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})


app.post('/', (req, res) => {
    let first_name = req.body.fname;
    let last_name = req.body.lname;
    let email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/3de81ce606';

    const options = {
        method: 'POST',
        auth: 'rohit:9ca00cb373950ecbc5880cca5c2d99a3-us21'
    }

    const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            console.log(JSON.parse(data).error_count);
            if(JSON.parse(data).error_count === 0){
                console.log(jsonData.error_count);
                res.sendFile(__dirname + '/success.html');
            }else{
                console.log(JSON.parse(data));
                res.sendFile(__dirname + '/failure.html');
            }
        })
    })

    request.write(jsonData);
    request.end();
})


app.listen(3000, () => {
    console.log("App is running at port 3000");
})



//9ca00cb373950ecbc5880cca5c2d99a3-us21

//3de81ce606