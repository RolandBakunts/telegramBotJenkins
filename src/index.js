const { Telegraf } = require('telegraf');
const axios = require('axios');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const text = require('./commands')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.help((ctx) => ctx.reply(text.commands));

bot.command("get_weather", async (ctx) => {
const city = ctx.update.message.text.split(" ")[1]
const jobName = 'weather'
  try {
  if ( city )  {
   await axios.post(`${process.env.JENKINS_URL}/job/${jobName}/buildWithParameters?name=${city}`, {}, {
    headers: {
        Authorization: `Basic ${Buffer.from('admin:' + process.env.API_TOKEN).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    }
);

// Must improve.
setTimeout(async () => {
    const response = await axios.get(
        `${process.env.JENKINS_URL}/job/${jobName}/lastBuild/consoleText`,
        {
          auth: {
            username: process.env.JENKINS_USERNAME,
            password: process.env.JENKINS_PASSWORD
          }
        }
      );
    const temperature = response.data.match(/\+\d+°F/)[0];

    ctx.replyWithHTML(temperature, {
        disable_web_page_preview: false,
    })
}, 10000);
} else {
  ctx.replyWithHTML('Please provide a city name...', {
    disable_web_page_preview: false,
})
}
  } catch (error) {
    ctx.replyWithHTML('please try again', {
        disable_web_page_preview: false,
    })
      }
    }       
);


bot.command("run_job", async (ctx) => {
    try {
    const jobName = 'deploy'

    await axios.post(`${process.env.JENKINS_URL}/job/${jobName}/build`, {}, {
        headers: {
            Authorization: `Basic ${Buffer.from('admin:' + process.env.API_TOKEN).toString('base64')}`,
            'Content-Type': 'application/json'
          }
        })

        ctx.replyWithHTML('deploying...', {
          disable_web_page_preview: false,
      })
    } catch (error) {
      ctx.replyWithHTML('please try again', {
          disable_web_page_preview: false,
      })
        }
      }
  );


bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
