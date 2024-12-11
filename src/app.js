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

const AU_PROJECT = 'au-project';
const GROWPILOT = 'growpilot'
const RESOURCE_GROUP_NAME = 'test1-resource-group';

app.command('/stop-vm', async ({ command, ack, say }) => {
    await ack();

    const projectName = command.text.trim();
    console.log(projectName);

    if (!projectName) {
        return say("중지할 VM 이름을 입력해주세요.");
    }


    try {
        if (projectName === "au" |
            projectName === 'au' |
            projectName === '호주' |
            projectName === '호주 프로젝트' |
            projectName === '호주프로젝트' |
            projectName === 'dev-test-vm'
        ) {
            const vmName = 'dev-test-vm';

            try {
                await stopVM(vmName);
                return say(`${vmName}을 성공적으로 중지했습니다.`);
            } catch {
                console.error(error);
                return say(`${vmName}을 중지하는 데 실패했습니다. 콘솔을 이용해주세요.`);
            }
        } else if (
            projectName === 'growpilot' |
            projectName === 'nh' |
            projectName === 'nh-project' |
            projectName === '농협' |
            projectName === '그로우파일럿' |
            projectName === 'gp' |
            projectName === 'test1-growpilot-vm'
        ) {
            console.log('growpilot vm stop', projectName)
            const vmName = 'test1-growpilot-vm';

            try {
                await stopVM(vmName);
            } catch (error) {
                console.error(error);
                return say(`${vmName}을 중지하는 데 실패했습니다. 콘솔을 이용해주세요.`)
            }
        } else {
            const vmName = projectName

            try {
                await stopVM(vmName);
            } catch (error) {
                console.error(error);
                return say(`${vmName}을 중지하는 데 실패했습니다. 콘솔을 이용해주세요.`)
            }
        }

    } catch (error) {
        console.error(error);
    }
});

const stopVM = async (vmName) => {
    try {
        console.log('VM을 중지합니다.', vmName);
        await computeClient.virtualMachines.beginDeallocateAndWait(RESOURCE_GROUP_NAME, vmName);
    } catch (error) {
        console.error(error);
    }
}

app.command('/start-vm', async ({ command, ack, say }) => {
    await ack();

    const projectName = command.text.trim();
    console.log(projectName);

    if (!projectName) {
        return say("시작할 VM 이름을 입력해주세요.");
    }


    try {
        if (projectName === "au" |
            projectName === 'au' |
            projectName === '호주' |
            projectName === '호주 프로젝트' |
            projectName === '호주프로젝트' |
            projectName === 'dev-test-vm'
        ) {
            const vmName = 'dev-test-vm';
            try {
                await startVM(vmName);
                return say(`${vmName}을 성공적으로 시작했습니다.`);
            } catch {
                console.error(error);
                return say(`${vmName}을 시작하는 데 실패했습니다. 콘솔을 이용해주세요.`);
            }
        } else if (
            projectName === 'growpilot' |
            projectName === 'nh' |
            projectName === 'nh-project' |
            projectName === '농협' |
            projectName === '그로우파일럿' |
            projectName === 'gp' |
            projectName === 'test1-growpilot-vm'
        ) {
            const vmName = 'test1-growpilot-vm';
            try {
                await startVM(vmName);
                return say(`${vmName}을 성공적으로 시작했습니다.`);
            } catch {
                console.error(error);
                return say(`${vmName}을 시작하는 데 실패했습니다. 콘솔을 이용해주세요.`);
            }
        } else {
            const vmName = projectName

            try {
                await startVM(vmName);
                return say(`${vmName}을 성공적으로 시작했습니다.`);
            } catch {
                console.error(error);
                return say(`${vmName}을 시작하는 데 실패했습니다. 콘솔을 이용해주세요.`)
            }
        }

    } catch (error) {
        console.error(error);
    }
});

const startVM = async (vmName) => {
    try {
        console.log('VM을 시작합니다.', vmName);
        await computeClient.virtualMachines.beginStartAndWait(RESOURCE_GROUP_NAME, vmName);
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    try {
        await app.start(process.env.PORT || 3100);
        console.log('⚡️ Bolt app is running!');
    } catch (error) {
        console.error('Error starting Bolt app:', error);
    }
})();