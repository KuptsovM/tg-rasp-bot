
const tg = require('telegraf')
const {Telegraf, Input} = require("telegraf");
const {Builder, Browser, By, Key, until, error} = require('selenium-webdriver')
const fs  = require('fs')
const bot = new Telegraf('6183410203:AAH0XbrB3ax5YYecgVZTce6yyleW4QoRlQg', {webhookReply: false})
bot.start((e) =>{
    e.reply('Привет, бродяга(и) >:(')
})
//Доделать драйвер для пск

bot.hears('/rasp', (e) =>{
    try {



        if(fs.existsSync('./rasp.png'))
        {
            e.replyWithPhoto({source : './rasp.png'})
        }
        else{
            let driver = new Builder().forBrowser(Browser.CHROME).build()
            async function run()
            {
                driver.get('https://system.fgoupsk.ru/student/login')
                await driver.findElement(By.xpath('//input[@name="id"]')).sendKeys('1027799')
                await driver.findElement(By.xpath('//input[@name="password"]')).sendKeys('111111')
                await driver.findElement(By.xpath('//button[@type="submit"]')).click()
                await driver.get('https://system.fgoupsk.ru/student/?mode=ucheba')
                await driver.findElement(By.xpath('/html/body/div[2]/section/table[1]')).takeScreenshot().then(
                    function(image, err) {
                        fs.writeFile('rasp.png', image, 'base64', function (err) {

                        });
                    }

                )
                await driver.quit()
                await e.replyWithPhoto({source : './rasp.png'})

            }
            run()
        }








    }
    catch (err)
    { console.log(err)}



})



bot.launch()

console.log('Started.')

