const { App } = require('@slack/bolt');
const { DefaultAzureCredential } = require('@azure/identity');
const { ComputeManagementClient } = require('@azure/arm-compute');
require('dotenv').config();


const app = new App({
    token: process.env.SLACK_BOT_TOKEN ,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3100
});

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new DefaultAzureCredential();
const computeClient = new ComputeManagementClient(credential, subscriptionId);

app.command('/stop-vm', async ({ command, ack, say }) => {
    await ack();

    const vmName = command.text.trim();
    console.log(vmName);

    if (!vmName) {
        return say("중지할 VM 이름을 입력해주세요.");
    }

    try {

    } catch (error) {
        console.error(error);
    }
});

(async () => {
    try {
        await app.start(process.env.PORT || 3100);
        console.log('⚡️ Bolt app is running!');
    } catch (error) {
        console.error('Error starting Bolt app:', error);
    }
})();